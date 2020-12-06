const mongoose = require('mongoose');
const Task = require('./task');

const Label = mongoose.Schema(
    {
        name: { 
            type: String,
            require: true 
        },
        tasks: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
            }
        ]
    }
);

module.exports = mongoose.model('Label', Label);