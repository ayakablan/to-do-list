const mongoose = require('mongoose');
const Label = require('./label');

const Task = mongoose.Schema(
    {
        task_title: {
            type: String,
            required: true
        },
        task_description: {
            type: String
        },
        task_mark: {
            type: String,
            defualt: 'unmarked'
        },
        task_visibility: {
            type: String,
            defualt: 'visible'
        },
        labels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Label',
            }
        ]
    }

);

module.exports = mongoose.model('Task', Task);