const User = require("./task")

const fetchDB = async () => { 
  return await Task.find(); 
}

const addUser = async ({name, password})=> {
  const newUser = new User({
    name,
    password
  });
  return await newUser.save();
}

const addTask = async (description, userId)=> {
  
  const user = await User.findById(userId);

  const newTask = {
    description
  };

  user.tasks.push(newTask);
  return await user.save();
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
  addUser,
  addTask,
  updateStatus,
  deleteTaskById
}