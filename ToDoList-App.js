const express = require('express');
const app =  express();
const  mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json()); 

//connect to DB
mongoose.connect(
    process.env.DB_Connection,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('connected to DB!') 
);

//Routes
app.get('/', (req,res) => {
    res.send('<hr><center><h1>To Do List</h1></center></hr>'); 
});

//Import routes
const tasksRoute = require('./controllers/task_routes');  
const labelsRoute = require('./controllers/label_routes');  

//Middleware
app.use('/api/tasks', tasksRoute);
app.use('/api/labels', labelsRoute);

app.listen(3000, () => {
    console.log('sever is up and ruuning!')
});