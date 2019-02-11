const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Task = require('../models/task');

// Register
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

// Authenticate
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

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// Addtask
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

router.get('/showtask', (req, res) => {
  Task.getTask(function(err,tasks){
    if(err) throw err;
    res.json(tasks);
  });
});

//UPDATE Task
router.put('/updatetask/:id', function(req, res, next){
  Task.findById(req.params._id, function (err, task) {
      if (!task) {
          console.log('error', 'No task found');
          return res.redirect('/updatetask/:id');
      }
      console.log('task found');
      var taskid = req.body.taskid;
      var taskname = req.body.taskname;
      var taskhandler= req.body.taskhandler;
      var taskclientname = req.body.taskclientname;
      var taskdescription=req.body.taskdescription;

      task.taskid = taskid;
      task.taskname = taskname;
      task.taskhandler= taskhandler;
      task.taskclientname = taskclientname;
      task.taskdescription=taskdescription;

      task.save();
      console.log("updated Task");
      res.redirect('/updateTask/:id');
  });
});

module.exports = router;
