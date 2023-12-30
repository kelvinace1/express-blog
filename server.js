require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const postRoute = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
const app = express()

//nvironment variables
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } 
}));

app.use('auth/login', (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
    } else {
        next()
    }
})

//routes
app.use('/posts', postRoute)
app.use('/auth', userRoute)

//template engine
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('postViews/index')
    res.status(200)
})


mongoose.connect(MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=> {
        console.log(`app is running on port ${PORT}`)
    })
    console.log("connected to mongoDB")
})
.catch((error) => {
    console.log(error)
})

