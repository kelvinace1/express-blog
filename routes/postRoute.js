const express = require('express')
const multer = require('multer')
const postModel = require('../models/postModel')
const {getPosts, getPost, createPost, getUpdatePost, updatePost,getDeleteConfirmation, deletePost} = require('../controllers/postController')
const router = express.Router()

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).single('image')

router.get('/create', (req, res) =>{
    res.render('postViews/create')
})


router.get('/', getPosts)
router.post('/create',upload, createPost )
router.get('/:id/edit', getUpdatePost)
router.post('/:id/update', updatePost)
router.get('/:id/',getPost ),
router.get('/:id/delete', getDeleteConfirmation)
router.post('/:id/delete', deletePost)


module.exports = router 