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
const postsRoute = require('./controllers/routes');  

//Middleware
app.use('/', postsRoute);

app.listen(3000);