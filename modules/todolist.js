const mongoose = require('mongoose');

const item_schema = mongoose.Schema(
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
        }

    }

);

module.exports = mongoose.model('item', item_schema);