const dbService = require('../models/dbService');

getAllTodos = (req, res) =>  {
    const data = dbService.fetchDB();
    res.send(data);
}

addTask = (req,res) => {
    const newTask = dbService.addTask(req.body.description);
    res.send(newTask);
}

updateTask = (req,res) => {
    const data = dbService.fetchDB();
    const index =  dbService.findTask(req.params.id);
    data[index]['completed'] = true;
    res.send(data[index]);
}

deleteTask = (req,res) => {
    const data = dbService.fetchDB();
    const index =  dbService.findTask(req.params.id);
    data.splice(index,1);
    res.send(`id ${req.params.id} deleted successfully`);
}

module.exports = {getAllTodos, addTask, updateTask, deleteTask};