const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    is_done: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = mongoose.model('Todo', todoSchema);