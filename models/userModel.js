const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
            first_name:{
                type: String,
                required: [true, 'fill in the details'],
            },
            last_name:{
                type: String,
                required: [true, 'fill in the details'],
            },
            username:{
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            email:{
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            password1:{
                type: String,
                required: true,

            },
            password2:{
                type: String,
                required: true,

            }

        })

const User = mongoose.model('user', userSchema)

module.exports = User