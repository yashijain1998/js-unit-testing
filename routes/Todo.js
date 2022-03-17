const express = require('express');
const router = express.Router();

const {getAllTodos, addTask, updateTask, deleteTask} = require('../controllers/TodoController');

// get all tasks
router.get('/task', getAllTodos);

//create a new task
router.post('/task', addTask);

//update task
router.put('/task/:id', updateTask);

//delete task
router.delete('/task/:id', deleteTask);

module.exports = router;