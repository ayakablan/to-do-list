const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Label = require('../modules/label');
const Task = require('../modules/task');

//get all labels
router.get('/', async (req,res) => {
    try{
        const labels = await Label.find();
        res.json(labels); 
    } catch(err){
        res.json({message:err});
    }
}); 

//get a specific label
router.get('/:labelId', async (req,res) => {
    try{
        const label = await Label.findById(req.params.labelId);
        res.json(label); 
    } catch(err){
        res.json({message:err});
    }
}); 

//post a label 
router.post('/addlabel', async (req,res) => {
    const newlabel = new Label({
        name: req.body.name
    });
    try{
        const savedlabel = await newlabel.save();
        res.json(savedlabel);
    } catch(err){
        res.json({message:err});
    }
});

//update label name
router.patch('/edit/:labelId', async (req,res) => {
    try{
        const updatedlabel = await Label.updateOne(
            {_id: req.params.labelId},
            {$set:{name: req.body.name }}
         );
        res.json(updatedlabel);
    } catch(err){
        res.json({message: err});
    }
 });

//delete label
router.delete('/:labelId', async (req,res) => {
    try{
        Task.pre('remove', function(next){
            this.model('Label').update(
                {_id: {$in: this.labels}}, 
                {$pull: {tasks: this._id}}, 
                {multi: true},
                next
            );
        });
        const deletedlabel = await Label.deleteOne({_id: req.params.labelId});
        res.json(deletedlabel);
    } catch (err){
        res.json({message: err});
    }
}); 

//delete all label
router.delete('/', async (req,res) => {
    try{
        const deletedlabels = await Label.remove({});
        res.json(deletedlabels);
    } catch (err){
        res.json({message: err});
    }
       
}); 

//get label tasks
router.get('/:labelId/tasks', async (req,res) => {
    try {
        const label = await Label.findById(req.params.labelId).populate('tasks');
        res.json(label);
    } catch(err){
        res.json({message: err});
    }
});

//add task to label
router.post('/:labelId/addtask', async (req,res) => {
    const newTask = new Task({
        task_title: req.body.task_title,
        task_description: req.body.task_description,
        task_visibility: true,
        task_mark: false   
     });
    try {
        const label = await Label.findById(req.params.labelId);
        newTask.labels = req.params.labelId;
        label.tasks.push(newTask);
        await label.save();
        res.json(label);
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch(err){
        res.json({message: err});
    }
});

//remove task from a label
router.delete('/:labelId/:taskId/delete', async (req,res) => {
    try{
        const label = await Label.findById(req.params.labelId);
        const task = await Task.findById(req.params.taskId);
        Label.exists({"_id": label, "tasks": task}, function(err, result) {
            if (err) {
                res.send(err);
              } else {
                if(result){
                    label.tasks.pop(task);
                    task.labels.pop(label);
                    label.save();
                    task.save();
                    res.json(label,task);
                }
                else{
                    res.json("task does not exists");   
                }
            }
        });
    }catch(err){
        res.message({message: err});
    }
});


module.exports = router;  