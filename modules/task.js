const mongoose = require('mongoose');

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
        label: {

        }
    }

);

module.exports = mongoose.model('item', Task);