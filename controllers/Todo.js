const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  const { studentName, studentDegree, studentUniname, studentrollnumber } = req.body;

  if (!(studentName && studentDegree && studentUniname && studentrollnumber)) {
    return res.status(400).send({ message: "Please fill all the input" });
  }

  try {
    // Check if the roll number already exists in the database
    const existingTodo = await Todo.findOne({ studentrollnumber });

    if (existingTodo) {
      return res.status(404).json({ message: 'Roll number already exists' });
    }

    // If roll number doesn't exist, create a new Todo entry
    const user = new Todo({
      studentName,
      studentDegree,
      studentUniname,
      studentrollnumber
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: 'Todo created successfully!!',
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Todo', error: error.message });
  }
};
const getAllTodo = async (req, res) => {
  try {
    const states = await Todo.find();
    res.send({
      Todo: states,
      message: "Todo Fetch Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteTodo = async (req, res) => {
  try {
    // Check if the state exists
    const deletedResource = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const stateId = req.params.id;
    const { studentName, studentDegree, studentUniname, studentrollnumber } = req.body;
    if (!(studentName && studentDegree && studentUniname && studentrollnumber)) {
      return res.status(400).send({ message: "Please fill all the input" });
    }
    // Find the state by its ID
    const state = await Todo.findById(stateId);
    if (!state) {
      return res.status(404).send({ error: "Student information not found" });
    }
    

    // Update the fields
    if (studentName !== undefined) {
      state.studentName = studentName;
    }
    if (studentDegree !== undefined) {
      state.studentDegree = studentDegree;
    }
    if (studentUniname !== undefined) {
      state.studentUniname = studentUniname;
    }
    if (studentrollnumber !== undefined) {
      state.studentrollnumber = studentrollnumber;
    }

    // Save the updated state
    await state.save();

    res.status(200).send({
      state,
      message: "Student information updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createTodo, getAllTodo, deleteTodo, updateTodo };
