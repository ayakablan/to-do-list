const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Task = require('../modules/task.js');
const Label = require('../modules/label');

//Get all the tasks
router.get('/', async (req,res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks); 
    } catch(err){
        res.json({message:err});
    }
}); 

//Submmit a task
router.post('/addtask',  async (req,res) => {
    const task = new Task({
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_visibility: true,
        task_mark: false
    });
    try{
        const savedTask = await task.save()
        res.json(savedTask); 
    } catch(err ){
        res.json({ message: err});
    }

});

//get a specific tasks
router.get('/:taskId', async (req,res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        res.json(task);
    } catch(err){
        res.json({message: err});
    }
});


//delete a task
router.delete('/:taskId', async (req,res) => {
    try{
        const deletedTask = await Task.deleteOne({_id: req.params.taskId});
        res.json(deletedTask);
    } catch (err){
        res.json({message: err});
    }

}); 

//delete all tasks
router.delete('/', async (req,res) => {
    try{
        const deletedAll = await Task.remove({});
        res.json(deletedAll)
    } catch (err){
        res.json({message: err});
    }
});

//update a task title
router.patch('/edit_title/:taskId', async (req,res) => {
   try{
       const updatedtask = await Task.updateOne(
           {_id: req.params.taskId},
           {$set:{task_title: req.body.task_title, }}
        );
       res.json(updatedtask);
   } catch(err){
       res.json({message: err});
   }
});

//update a task task_description
router.patch('/edit_description/:taskId', async (req,res) => {
    try{
        const updatedtask = await Task.updateOne(
            {_id: req.params.taskId},
            {$set:{task_description: req.body.task_description}}
        );
        res.json(updatedtask);
    } catch(err){
        res.json({message: err});
    }
 });

//visibilty of task
router.patch('/edit_visibility/:taskId', async (req,res) => {
    try{
        const hiddentask = await Task.updateOne(
            {_id: req.params.taskId},
            {$set:{task_visibility: req.body.task_visibility}}
        );
        res.json(hiddentask);
    } catch(err){
        res.json({message: err});
    }
});

//mark a task done
router.patch('/task_marked/:taskId', async (req,res) => {
    try{
        const markedtask = await Task.updateOne(
            {_id: req.params.taskId},
            {$set:{task_mark: req.body.task_mark}}
        );
        res.json(markedtask);
    } catch(err){
        res.json({message: err});
    }
});

//get task's labels
router.get('/:taskId/labels', async (req,res) =>{
    try {
        const task = await Task.findById(req.params.taskId).populate('labels');
        res.json(task);
    } catch(err){
        res.json({message: err});
    }
});

//add a label to a task
router.post('/:taskId/:labelId/add', async (req,res) => {
    try {
        const task = await Task.findById(req.params.taskId);   
        const label = await Label.findById(req.params.labelId);
        Task.exists({"_id": task, "labels": label}, function(err, result) {
            if (err) {
                res.send(err);
              } else {
                if(!result){
                    task.labels = label;
                    label.tasks = task;
                    task.save();
                    label.save();
                    res.json(task);   
                }
                else{
                    res.json("label is already exists");   
                }
            }
        });
    } catch(err){
        res.json({message: err});
    }
});

//remove label from task
router.delete('/:taskId/:labelId/delete', async (req,res) => {
    try{
        const task = await Task.findById(req.params.taskId);
        const label = await Label.findById(req.params.labelId);
        Task.exists({"_id": task, "labels": label}, function(err, result) {
            if (err) {
                res.send(err);
              } else {
                if(result){
                    task.labels.pop(label);
                    label.tasks.pop(task);
                    task.save();
                    label.save();
                    res.json(task,label);
                }
                else{
                    res.json("label does not exists");   
                }
            }
        });
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;  