const mongoose = require('mongoose');
const dbService = require('../models/dbService');
const taskSchema = require("../utils/taskSchema");

getAllTodos = async (req, res) =>  {
    const data = await dbService.fetchDB();
    res.send(data);
}

addUser = async (req, res) => {
    const result = req.body;
    const newUser = await dbService.addUser(result);
    res.status(201).send(newUser);
}

addTask = async (req,res) => {
    const userId =  req.params.id;
    const result = taskSchema.validate(req.body);
    if(result.error) return res.status(400).send("Description is necessary for adding a new task.")
    const newTask = await dbService.addTask(req.body.description, userId);
    res.status(201).send(newTask);
}

updateTask = async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID format is invalid")
    }
    const task =  await dbService.updateStatus(req.params.id);
    if(task === null) return res.status(404).send("Given task is not present for updation");
    res.status(201).send(task);
}

deleteTask = async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("ID format is invalid")
    }
    const task = await dbService.deleteTaskById(req.params.id);
    if(task == null) return res.status(404).send("Given task is not present for deletion.");
    res.send(task);
}

module.exports = {getAllTodos, addUser, addTask, updateTask, deleteTask};