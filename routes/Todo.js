const express = require('express');
const router = express.Router();

const {getAllTodos, addTask, updateTask, deleteTask} = require('../controllers/TodoController');

// router.get('/allTodos' , (req,res) => {
//     console.log(getAllTodos);
//     res.send(getAllTodos);
// })

// get all tasks
router.get('/allTodos', getAllTodos);

//create a new task
router.post('/addTask', addTask);

//update task
router.put('/updateTask/:id', updateTask);

//delete task
router.delete('/deleteTask/:id', deleteTask);

module.exports = router;