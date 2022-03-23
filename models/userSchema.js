const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const userSchema= new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    tasks: {
      type: [taskSchema],
      default: []
    }
  });
  
const User = mongoose.model("user",userSchema);

module.exports = User;