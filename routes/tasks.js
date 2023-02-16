const express = require('express');
const taskRoutes = express.Router();
const { v4: uuidv4 } = require ("uuid");
const taskController = require('../controllers/taskController');
uuidv4();

/* GET all tasks. */
taskRoutes.get('/all', taskController.getAllTasks);

// This section will pull a single record, using the a dynamic id paramter.
taskRoutes.get('/get-one/:id', taskController.getOneTask);

//Add a new post
taskRoutes.post("/create-one", taskController.createNewTask);

//Add multiple new posts
taskRoutes.post("/create-many", taskController.createManyTasks);

// This section will help you delete a single record by id.
taskRoutes.delete('/delete-one/:id', taskController.deleteOneTask); 

//Mark a task as complete
taskRoutes.put('/complete-one/:id', taskController.completeTask);

// Delete all records marked as complete
taskRoutes.delete('/delete-complete', taskController.deleteComplete);

module.exports = taskRoutes;
