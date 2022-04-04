const User = require("./userSchema")

const getAllTasks = async (userId) => {
  try {
    const data =  await User.findById(userId, 'tasks');
    if(data == null) {
      throw new Error('user not found');
    }
    return data.tasks
  } catch(err) {
     throw new Error(err.message)
  }
}

const addTask = async (userId, task)=> {
  try {
    const user = await User.findById(userId);
    if(user == null) {
      throw new Error('user not found')
    };
    user.tasks.push(task);
    const { tasks } = await user.save();
    const addedTask = tasks[tasks.length - 1];
    return addedTask;
  }catch(err){
    throw new Error(err.message)
  } 

}

const updateStatus = async (userId, taskId)=> {
  try {
    const user = await User.findById(userId);
    if(user == null) { 
      throw new Error('user not found');
    }
    const task = user.tasks.id(taskId);
    if(task == null) {
      throw new Error('task not found');
    }
    task.completed = !task.completed; 
    const filter = {
      "_id" : userId,
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

const deleteTask = async (userId,taskId)=> {
  try {
    const user = await User.findById(userId);
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