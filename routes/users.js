const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Task = require('../models/task');

// Register Route
router.post('/register', (req, res, next) => {
  let newUser = new User ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  });
});

// Authenticate Route
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile Route
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// ================================================================================
// Addtask Route
router.post('/addtask', (req, res, next) => {
  let newTask = new Task ({
    taskid: req.body.taskid,
    taskname: req.body.taskname,
    taskdescription: req.body.taskdescription,
    taskhandler: req.body.taskhandler,
    taskclientname: req.body.taskclientname
  });
  Task.addTask(newTask, (err, task) => {
    if(err) {
      res.json({success: false, msg: 'Failed to add task'});
    } else {
      res.json({success: true, msg: 'Task added'});
    }
  });
});

//Showtask Route
router.get('/showtask', (req, res) => {
  Task.getTask(function(err,tasks){
    if(err) throw err;
    res.json(tasks);
  });
});

//Detailtask Route
router.get('/find/:_id', function (req, res) {
  Task.find({ _id: req.params._id }, function (err, tasks) {
    if(err) {
      console.log(err);
    }
    else {
      return res.json(tasks);
    }
  });
});

//Updatetask Route
router.put('/:_id', function(req, res){
  var update = {
    taskid: req.body.taskid,
    taskname:req.body.taskname,
    taskclientname:req.body.taskclientname,
    taskhandler:req.body.taskhandler,
    taskdescription:req.body.taskdescription
  }
  Task.updateTask(req.params._id,update,function(err,task){
    if(err) throw err;
    res.json(task);
  });
});

//Deletetask Route
router.delete("/:id", function (req, res) {
  Task.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log("error");
    } else {
      console.log("Task deleted");
      return res.json({ success: true, msg: 'refresh' });
    }
  });
});

module.exports = router;
