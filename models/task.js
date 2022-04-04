const User = require("./userSchema")

const getAllTasks = async (userData) => {
  try {
    const user =  await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) {
      throw new Error('user not found');
    }
    return user.tasks
  } catch(err) {
     throw new Error(err.message)
  }
}

const addTask = async (userData, task)=> {
  try {
    const user =  await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) {
      throw new Error('user not found');
    }
    user.tasks.push(task);
    const { tasks } = await user.save();
    const addedTask = tasks[tasks.length - 1];
    return addedTask;
  }catch(err){
    throw new Error(err.message)
  } 

}

const updateStatus = async (userData, taskId)=> {
  try {
    const user = await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) { 
      throw new Error('user not found');
    }
    const task = user.tasks.id(taskId);
    if(task == null) {
      throw new Error('task not found');
    }
    task.completed = !task.completed; 
    const filter = {
      "email" : userData.email,
      "tasks._id": taskId 
    }
    const update = { 
      "$set": {
          "tasks.$.completed": task.completed
      }
    }
    User.findOneAndUpdate(filter,update, () =>  {})
    return task;
  } catch(err) {
    throw new Error(err.message);
  }
  
}

const deleteTask = async (userData,taskId)=> {
  try {
    const user = await User.findOne({ email: userData.email }, 'tasks');
    if(user == null) { 
      throw new Error('user not found');
    }
    const task = user.tasks.id(taskId);
    if(task == null) {
      throw new Error('task not found');
    }
    task.remove();
    await user.save();
    return task;
  } catch(err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getAllTasks,
  addTask,
  updateStatus,
  deleteTask
}