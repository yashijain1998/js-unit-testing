const express = require('express');
const router = express.Router();

const {getAllTodos, addUser, addTask, updateTask, deleteTask} = require('../controllers/TodoController');

// get all tasks
router.get('/task', getAllTodos);

//add user
router.post('/user', addUser);

//create a new task
router.post('/task/:id', addTask);

//update task
router.put('/task/:id', updateTask);

//delete task
router.delete('/task/:id', deleteTask);

module.exports = router;