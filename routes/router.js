const express = require('express');
const router = express.Router();

const {getAllTasks, addUser, addTask, updateTask, deleteTask} = require('../controllers/apiController');

//add user
router.post('/user', addUser);

// get all tasks
router.get('/user/:uid/tasks', getAllTasks);

//create a new task
router.post('/user/:uid/tasks', addTask);

//update task
router.put('/user/:uid/tasks/:tid', updateTask);

//delete task
router.delete('/user/:uid/tasks/:tid', deleteTask);

module.exports = router;