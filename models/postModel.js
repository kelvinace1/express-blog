const mongoose = require('mongoose')
const User = require('../models/userModel')

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required: [true, "enter post title"]
    },
    content:{
        type:String,
        required: [true, "enter post content"]
    },
    image: {
        data: {
          type: Buffer,
          default: null  
        },
        contentType: {
          type: String,
          default: null
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      },

    },
    {
        timestamps:true
    }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post 