const tasksModel = require('../models/Tasks');
const {v4: uuidv4} = require("uuid");

// 1. Create Task
async function createNewTask(req, res, next) {
    try {
      //parse out fields from POST request
      const id = uuidv4();
      const name  = (req.body.name); 
      const assignee = (req.body.assignee);
      const description = (req.body.description); 
      const dateDue = (req.body.dateDue);

      //pass fields to new Tasks model, notice how it's way more organized and does the type checking for us
      const newTask = new tasksModel({
        id,
        name,
        assignee,
        description,
        dateDue
      });
  
      //save our new entry to the database 
      const savedData =  await newTask.save();
      
      //return the successful request to the user 
      res.json({
          success: true,
          blogs: savedData
      });
  
    } catch (e) {
      console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
    }
  };

// 2. Update Task (Mark as Completed/ Uncompleted)
async function completeTask(req, res, next) {
  try {
    const changeTask = await tasksModel.updateOne(
      {"id": req.params.id}, 
      {$set: {
        completed: true, 
        dateCompleted: new Date(), 
        status: "complete"
      }}
      );
    res.json({message: `Task id ${req.params.id} has been marked as completed`, 
    task: changeTask
  });
  // getOneTask(req, res, next);
  }
  catch (error) {
    res.status(500).send(error);
  }
};

// 3. Delete Task 
async function deleteOneTask(req, res, next) {
  try {
    const oneTask = await tasksModel.findOneAndRemove(
      {"id": req.params.id}
      );
    res.json({message: "Removed", 
      removed: oneTask});
  }
  catch (error) {
    res.status(500).send(error);
  }
};

// 4. Delete Multiple Tasks (deltes all tasks marked as completed)
async function deleteComplete(req, res, next) {
  try {
    const oneTask = await tasksModel.deleteMany({"completed": true});
    res.json({message: "Removed", 
      removed: oneTask});
  }
  catch (error) {
    res.status(500).send(error);
  }
};

// 5. Create Muliple Tasks
async function createManyTasks(req, res, next) {
  try {
    const taskArray = req.body;
    
    // const options = { forceServerObjectId: true };
    const savedTasks =  await tasksModel.insertMany(taskArray);

    res.json({
      success: true,
      blogs: savedTasks
  });
  } catch (e) {
    console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
  }

}

// 6. Display all Tasks 
async function getAllTasks(req, res, next) {

  //query blogs 
  try {
    const allTasks = await tasksModel.find({});
    res.json({message: `Success, here are all ${allTasks.length} tasks!!`,
    Tasks: allTasks});
  }catch(error){
    res.status(500).send(error);
  }
}

// 7. Display one Task 
async function getOneTask(req, res, next) {

  //query blogs 
  try {
    const oneTasks = await tasksModel.findOne({id: req.params.id});
    res.json({message: `Success, here's your task!'`,
    Tasks: oneTasks});
  }catch(error){
    res.status(500).send(error);
  }
}


module.exports = {
  completeTask, 
  createManyTasks, 
  createNewTask,
  deleteComplete,
  deleteOneTask,
  getAllTasks,
  getOneTask
  
};