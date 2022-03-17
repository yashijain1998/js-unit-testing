const dbService = require('../models/dbService');
const taskSchema = require("../utils/taskSchema");

getAllTodos = (req, res) =>  {
    const data = dbService.fetchDB();
    res.send(data);
}

addTask = (req,res) => {
    const result = taskSchema.validate(req.body);
    if(result.error) return res.status(400).send("Description is necessary for adding a new task.")
    const newTask = dbService.addTask(req.body.description);
    res.status(201).send(newTask);
}

updateTask = (req,res) => {
    const data = dbService.fetchDB();
    const index =  dbService.findTask(req.params.id);
    if(index == null) return res.status(404).send("Given task is not present for updation");
    data[index]['completed'] = true;
    res.status(201).send(data[index]);
}

deleteTask = (req,res) => {
    const data = dbService.fetchDB();
    const index =  dbService.findTask(req.params.id);
    if(index == null) return res.status(404).send("Given task is not present for deletion.");
    data.splice(index,1);
    res.send(`id ${req.params.id} deleted successfully.`);
}

module.exports = {getAllTodos, addTask, updateTask, deleteTask};