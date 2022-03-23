const express = require('express');
const router = express.Router();

const {getAllTasks, addUser, addTask, updateTask, deleteTask} = require('../controllers/TaskController');

//add user
router.post('/user', addUser);

// get all tasks
router.get('/user/:uid/task', getAllTasks);

//create a new task
router.post('/user/:uid/task', addTask);

//update task
router.put('/user/:uid/task/:tid', updateTask);

//delete task
router.delete('/user/:uid/task/:tid', deleteTask);

module.exports = router;