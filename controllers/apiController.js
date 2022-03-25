const taskService = require('../models/task');
const userService = require('../models/user');
const { isValidTask, isValidUser } = require("../utils/validation");
const isValidId = require('../utils/idValidator');

addUser = async (req, res) => {
    try {
        const userData = req.body;
        isValidUser(userData);
        const {_id} = await userService.addUser(userData);
        res.status(201).send({id:_id});
    } catch(err) {
        console.log(err)
        res.status(404).send({error: err.message})
    }
}

getUser = async(req,res) => {
    try{
        const userData = req.body;
        const data = await userService.getUser(userData);
        return res.send({ id: data })
    } catch(err) {
        res.status(400).send(err.message);
    }
}

getAllTasks = async (req, res) =>  {
    try {
        const userId = req.params.uid;
        isValidId(userId);
        const data = await taskService.getAllTasks(userId);
        res.send(data);
    } catch(err) {
        res.status(404).send(err.message);
    }
}

addTask = async (req,res) => {
    try {
        const userId =  req.params.uid;
        const taskData = req.body;
        isValidId(userId);
        isValidTask(taskData)
        const data = await taskService.addTask(userId, taskData);
        res.status(201).send(data);
    } catch(err) {
        res.status(404).send(err.message);
    }
}

updateTask = async (req,res) => {
    try {
        const userId = req.params.uid;
        const taskId = req.params.tid;
        isValidId(userId);
        isValidId(taskId);
        const data =  await taskService.updateStatus(userId, taskId);
        res.status(201).send(data);
    } catch(err) {
        res.status(404).send(err.message);
    }
}

deleteTask = async (req,res) => {
    try {
        const userId = req.params.uid;
        const taskId = req.params.tid;
        isValidId(userId);
        isValidId(taskId);
        const data = await taskService.deleteTask(userId, taskId);
        res.status(201).send(data);
    } catch(err) {
        res.status(404).send(err.message);
    }
}

module.exports = {getAllTasks, addUser, addTask, updateTask, deleteTask,getUser};