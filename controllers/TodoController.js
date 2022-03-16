let TodoList = require("../models/todoList.json");

getAllTodos = (req, res) =>  {
    res.send(TodoList);
}

addTask = (req,res) => {
    let newTask = {
        "id": TodoList[TodoList.length - 1].id + 1,
        "description": req.body.description,
        "completed": req.body.completed
    }
    TodoList.push(newTask);
    res.send(newTask);
}

updateTask = (req,res) => {
    const index = TodoList.findIndex(todo => todo.id == req.params.id);
    TodoList[index]['completed'] = true;
    res.send(TodoList[index]);
}

deleteTask = (req,res) => {
    const index = TodoList.findIndex(todo => todo.id == req.params.id);
    TodoList.splice(index,1);
    res.send(`id ${req.params.id} deleted successfully`);
}

module.exports = {getAllTodos, addTask, updateTask, deleteTask};

// exports.getAllTodos = (req, res) => {
//     // simply use .find() method and it will return all the todos
//     res.send(TodoList);
//   };