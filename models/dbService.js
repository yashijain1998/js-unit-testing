const Task = require("./task")

const fetchDB = async () => { 
  return await Task.find(); 
}

const addTask = async (description)=> {
  const newTask = new Task({
    description
  });
  return await newTask.save();
}

const updateStatus = async (id)=> {
  const task = await Task.findById(id);
  if( task === null) {
    return null;
  }
  task.completed = !task.completed;
  const newTask = await task.save();
  return newTask;
}

const deleteTaskById = async (id)=> {
  const task = await Task.findByIdAndRemove(id);
  return task;
}

module.exports = {
  fetchDB,
  addTask,
  updateStatus,
  deleteTaskById
}