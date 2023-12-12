const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  
  studentName: {
    type: String,
    trim: true,
    required: true,
  },
  studentDegree: {
    type: String,
    trim: true,
    required: true,
  },
  studentUniname: {
    type: String,
    trim: true,
    required: true,
  },
  studentrollnumber: {
    type: Number,
    trim: true,
    required: true,
  },
});

const Todo = mongoose.model("Student", todoSchema);
module.exports = Todo;
