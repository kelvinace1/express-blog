const Post = require('../models/postModel')

const getPosts = async(req, res) =>{
    try{
        const posts = await Post.find({})
        res.render('postViews/posts', {posts})
        res.status(200)
    }catch(error){
        console.log(error)
        res.status(500).send('error fetching posts')
    }
}

const getPost = async(req, res) =>{
    try{
        const {postID} = req.params
        const post = await Post.findById(postID)
        res.render('postViews/post', {post})
        res.status(200)
    }catch(error){
        console.log(error)
        res.status(500)
    }
}

//Post creation controller
const createPost = async(req, res) =>{
    try {
        const { title, content } = req.body
    
        const newPostData = {
          title,
          content,
        };
    
        // Check if an image was uploaded
        if (req.file) {
          newPostData.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
          };
        }
    
        const post = new Post(newPostData)
        await post.save();
    
        res.redirect('/posts')
      } catch (err) {
        console.log(err)
        res.status(500).send('Error creating post')
      }
}

//
const getUpdatePost = async(req, res) =>{
    try{
        const {id} = req.params
        const posts = await Post.findByIdAndUpdate(id)
        res.render('postViews/update', {posts})
        if (!posts){
            res.status(404)
        }
        res.status(200)
    }catch(error){
        console.log(error)
        res.status(500)
    }
}

//Update post controller
const updatePost = async (req, res) => {
    try {
      const {id} = req.params;
      const { title, content } = req.body;
  
      await Post.findByIdAndUpdate(id, { title, content })
  
      res.redirect('/posts'); 
    } catch (error) {
      console.error(error);
      res.status(500)
      //throw new Error("not valid")
    }
  };
  

const getDeleteConfirmation = async (req, res) => {
    try {
      const {id} = req.params;
      const posts = await Post.findById(id);
      res.render('postViews/deleteConfirmation', { posts })
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving post')
    }
  };
  
const deletePost = async(req, res) =>{
    try{
        const {id} = req.params
        const posts = await Post.findByIdAndDelete(id)
        if (!posts){
            res.status(404)
        }
        res.redirect('/posts')
        res.status(200)
    }catch(error){
        console.log(error)
        res.status(500)
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    getUpdatePost,
    updatePost,
    getDeleteConfirmation,
    deletePost
}

