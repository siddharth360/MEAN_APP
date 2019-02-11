const mongoose = require('mongoose');
const config = require('../config/database');

// Task Schema
const TaskSchema = mongoose.Schema ({
  taskid: {
    type: Number
  },
  taskname: {
    type: String,
    required: true
  },
  taskdescription: {
    type: String,
    required: true
  },
  taskhandler: {
    type: String,
    required: true
  },
  taskclientname: {
    type: String,
    required: true
  }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.addTask = function(newTask, callback) {
  newTask.save(callback);
}

module.exports.getTask = function(callback){
  Task.find(callback);
}


