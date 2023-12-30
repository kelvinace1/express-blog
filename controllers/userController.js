const User = require('../models/userModel')
const isAuthenticated = require('../middlewares/authMiddleware')
const bcrypt = require('bcrypt')
const saltRounds = 10

const registerUser = async( req, res, isAuthenticated) => {
    try{
        const {first_name, last_name, username, email, password1, password2} = req.body


        if(!first_name || !last_name || !username || !email || !password1 || !password2){
            return res.status(400).json({error: 'fill in your credentials' })
        }

        const existingUser = await User.findOne({email})
        const existingUsername = await User.findOne({username})

        if(existingUser){
            return res.status(400).json({error: 'this user already exists'})
        }

        if (existingUsername){
            return res.status(400).json({error: 'this username has been taken'})
        }

        if (password1 !== password2) {
            return res.status(400).json({ error: 'Passwords do not match' })
        }

        if (password1.length < 8){
            return res.status(400).json({error: 'your password should be more than 8 characters'})
        }
        
        hashedPassword = await bcrypt.hash(password1, saltRounds)
        const newUser = new User({first_name, last_name, username, email, password1:hashedPassword, password2 })
        await newUser.save()
        res.redirect('/loggedin')
        

    }catch(error){
        console.error(error)
        res.status(500).json({error: 'error'})
    }
}

/*const updateUserTemplate = (req, res) =>{
    const userID = req.params.id
    res.render('userViews/update', {userID})
} */
const updateUserForm = async (req, res) => {
    try {
      const {userID} = req.params;
      const user = await User.findById(userID)
      res.render('userViews/update', { user })
    } catch (error) {
      res.status(500).send('Error fetching user data');
    }
  };

const updateUser = async(req, res) =>{
    try{
        const {userID} = req.params
        const {first_name, last_name, username} = req.body

      

        const updatedUser = await User.findByIdAndUpdate(userID, {first_name, last_name, username}, {new: true})
        //res.render('userViews/update')
        if (!updatedUser){
            return res.status(404).json({msg: 'cant find user'})
        }
        res.status(200).json({msg: 'user updated '})

        /*if (!updatedUser){
            return res.status(404).json({msg: 'error updating user'})
        }
        res.status(200).json({msg: 'user updated successfully', updatedUser}) */
        
    }catch(err){
        console.log(err)
        res.status(500).json({msg: 'cant update user'})
    }
    
}

const userLogin = async(isAuthenticated, req, res) => {
    try{
        const {email, password1} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({msg: 'invalid user'})
        }

        const passwordCheck = await bcrypt.compare(password1, user.password1)
        if (!passwordCheck){
            return res.status(401).json({msg: 'invalid credentials'})
        }
        req.session.userId = user._id;
    }catch(err){
        console.error(err)
        return res.status(401).json({error: 'unable to login'})
    }
}

const getUsers = async(req, res) =>{
    try{
        const users = await User.find({})
        res.render('userViews/users', {users})
        res.status(200)
    }catch(err){
        console.log(err)
        res.status(500)
    }
}

module.exports = {registerUser, updateUser, updateUserForm, userLogin, getUsers}
                             