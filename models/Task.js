const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Title is required"], 
        minlength: [3, "Title must be at least 3 characters"], 
        maxlength: [100, "Title must be less than 100 characters"]
    },
    description: { 
        type: String, 
        maxlength: [500, "Description must be less than 500 characters"] 
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // User binding
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
