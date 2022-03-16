let todoList = require("./todoList.json");

const fetchDB = ()=> {
  return todoList; 
}

const addTask = (description)=> {
  const data = fetchDB();
  const newTask = {
    "id": data[data.length - 1].id + 1,
    "description": description,
    "completed": false
  }
  data.push(newTask);
  return newTask;
}

const findTask = (findID)=> {
  const data = fetchDB();
  const index = data.findIndex(task => task.id == findID );
  return index;
}

module.exports = {
  fetchDB,
  addTask,
  findTask
}