const mongoose = require('mongoose');
const dbService = require('../models/dbService');
const { taskValidation, userValidation } = require("../utils/validation");

addUser = async (req, res) => {
    try {
        const data = req.body;
        const validateResult = userValidation.validate(data);
        if(validateResult.error) return res.status(400).send(validateResult.error.message)
        const newUser = await dbService.addUser(data);
        res.status(201).send(newUser);
    } catch(err) {
        res.status(404).send(err)
    }
}

getAllTasks = async (req, res) =>  {
    try {
        const userId = req.params.uid;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("UserID format is invalid")
        }
        const data = await dbService.fetchDB(req.params.uid);
        if(data == null) return res.status(404).send("user not found")
        res.send(data);
    } catch(err) {
        res.status(404).send(err)
    }
}

addTask = async (req,res) => {
    try {
        const userId =  req.params.uid;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("UserID format is invalid")
        }
        const validateResult = taskValidation.validate(req.body);
        if(validateResult.error) return res.status(400).send(validateResult.error.message);
        const data = await dbService.addTask(req.body.description, userId);
        if(data == null) return res.status(404).send("user not found")
        res.status(201).send(data);
    } catch(err) {
        res.status(404).send(err)
    }
}

updateTask = async (req,res) => {
    try {
        const userId = req.params.uid;
        const taskId = req.params.tid;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("User ID format is invalid")
        }
        if(!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).send("Task ID format is invalid")
        }
        const data =  await dbService.updateStatus(userId,taskId);
        if(data === "user" || data === "task") return res.status(404).send(`${data} not found`);
        res.status(201).send(data);
    } catch(err) {
        res.status(404).send(err)
    }

}

deleteTask = async (req,res) => {
    try {
        const userId = req.params.uid;
        const taskId = req.params.tid;
        if(!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("User ID format is invalid")
        }
        if(!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).send("Task ID format is invalid")
        }
        const data = await dbService.deleteTask(userId,taskId);
        if(data === "user" || data === "task") return res.status(404).send(`${data} not found`);
        res.status(201).send(data);
    } catch(err) {
        res.status(404).send(err)
    }

}

module.exports = {getAllTasks, addUser, addTask, updateTask, deleteTask};