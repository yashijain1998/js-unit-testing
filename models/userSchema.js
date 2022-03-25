const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: [1, 'Description should not be empty'],
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const userSchema= new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: [3, 'Name must be mimimum 3 character'],
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: [5, 'Paaword must be mimimum 5 character'],
    },
    tasks: {
      type: [taskSchema],
      default: []
    }
  });

const User = mongoose.model("user",userSchema);

module.exports = User;