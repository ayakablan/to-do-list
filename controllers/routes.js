const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../modules/task.js');

//Get all the posts
router.get('/tasks', async (req,res) => {
    try{
        const posts = await Post.find();
        res.json(posts); 
    } catch(err){
        res.json({message:err});
    }
}); 

//Submmit a task
router.post('/',  async (req,res) => {
    const post = new Post({
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_visibility: true,
        task_mark: false
    });
    try{
        const savedPost = await post.save()
        res.json(savedPost); 
    } catch(err ){
        res.json({ message: err});
    }

});

//get a specific tasks
router.get('/:postId', async (req,res) => {
    try {
        const gettask = await Post.findById(req.params.postId);
        res.json(gettask);
    } catch(err){
        res.json({message: err});
    }
});


//delete a task
router.delete('/:postId', async (req,res) => {
    try{
        const deletedPost = await Post.remove({_id: req.params.postId});
        res.json(deletedPost);
    } catch (err){
        res.json({message: err});
    }
       
}); 

//delee all tasks
router.delete('/', async (req,res) => {
    try{
        const deletedAll = await Post.remove({});
        res.json(deletedAll)
    } catch (err){
        res.json({message: err});
    }
});

//update a task title
router.patch('/edit_title/:postId', async (req,res) => {
   try{
       const updatedtask = await Post.updateOne(
           {_id: req.params.postId},
           {$set:{task_title: req.body.task_title, }}
        );
       res.json(updatedtask);
   } catch(err){
       res.json({message: err});
   }
});

//update a task task_description
router.patch('/edit_description/:postId', async (req,res) => {
    try{
        const updatedtask = await Post.updateOne(
            {_id: req.params.postId},
            {$set:{task_description: req.body.task_description}}
        );
        res.json(updatedtask);
    } catch(err){
        res.json({message: err});
    }
 });

//visibilty of task
router.patch('/edit_visibility/:postId', async (req,res) => {
    try{
        const hiddentask = await Post.updateOne(
            {_id: req.params.postId},
            {$set:{task_visibility: req.body.task_visibility}}
        );
        res.json(hiddentask);
    } catch(err){
        res.json({message: err});
    }
});

//mark a task done
router.patch('/task_marked/:postId', async (req,res) => {
    try{
        const markedtask = await Post.updateOne(
            {_id: req.params.postId},
            {$set:{task_mark: req.body.task_mark}}
        );
        res.json(markedtask);
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;  