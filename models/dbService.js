const User = require("./userSchema")

const addUser = async (user)=> {
  const newUser = new User({
    name : user.name,
    password: user.password
  });
  return await newUser.save();
}

const fetchDB = async (userId) => {
  const user =  await User.findById(userId);
  if(user == null) return null;
  return user.tasks;
}

const addTask = async (description, userId)=> {
  const user = await User.findById(userId);
  if(user == null) return null;

  const newTask = {
    description
  };
  user.tasks.push(newTask);
  const updatedUser = await user.save();
  const addedTask = updatedUser.tasks[updatedUser.tasks.length - 1];
  return addedTask;
}

const updateStatus = async (userId,taskId)=> {
  const user = await User.findById(userId);
  if(user == null) { 
    return "user";
  }
  const task = user.tasks.id(taskId);
  if(task == null) {
    return "task"
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
}

const deleteTask = async (userId,taskId)=> {
  const user = await User.findById(userId);
  if(user == null) { 
    return "user";
  }
  const task = user.tasks.id(taskId);
  if(task == null) {
    return "task"
  }
  task.remove();
  await user.save();
  return task;
}

module.exports = {
  fetchDB,
  addUser,
  addTask,
  updateStatus,
  deleteTask
}