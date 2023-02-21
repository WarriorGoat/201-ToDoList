//import mongoose library
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

//Create a blogSchema
const taskSchema = new Schema({
  id: { type: String, required: true, default: () => uuidv4() },
  name: { type: String, required: true },
  assignee: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ body: String, date: Date }],
  completed: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now, required: true },
  dateDue: { type: Date, default: Date.now, required: true },
  dateCompleted: { type: Date, default: "" },
  status: {
    type: String,
    default: "incomplete",
    enum: ["incomplete", "complete", "deferred"],
  },
});

//Register model to the database collection
const tasksModel = mongoose.model("tasks", taskSchema);

//Make the model available to other files
module.exports = tasksModel;
