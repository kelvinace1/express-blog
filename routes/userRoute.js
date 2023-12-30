const express = require('express')
const {registerUser, updateUserForm, updateUser, userLogin, getUsers} = require('../controllers/userController')
const isAuthenticated = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/register', (req, res) =>{
    res.render('userViews/register')
})

router.get('/login', (req, res) => {
    res.render('userViews/login')
});

/*router.get('/update/:userID', (req, res) =>{
    res.render('userViews/update')
}) */

router.post('/register', isAuthenticated,  registerUser)
router.post('/loggedin', isAuthenticated, userLogin)
router.get('/:userID/edit/', updateUserForm)
router.post('/:userID/update/', updateUser)
router.get('/users', getUsers)



module.exports = router