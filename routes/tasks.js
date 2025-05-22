var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const Tasks = require("../models/Tasks");

let tasks = [
  {
    id: 1,
    name: "Task 1",
    description: "Description for Task 1",
    dueDate: "2026-10-01",
  },
  {
    id: 2,
    name: "Task 2",
    description: "Description for Task 2",
    dueDate: "2026-10-01",
  },
];

router.get("/getTasks", function (req, res, next) {
  Tasks.find()
    .then((response) => {
      if (response.length === 0) {
        return res.status(200).json({ message: "No tasks available." });
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving tasks." });
    });
});

router.delete("/deleteTask/:id", function (req, res, next) {
  console.log(req.params.id);

  if (req.params && req.params.id) {
    let id = req.params.id;
    Tasks.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
      .then((response) => {
        // res.status(200).json(response);
        if (response.deletedCount > 0) {
          res.status(200).json({ message: "Task deleted successfully" });
        } else {
          res.status(404).json({ message: "Task not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error deleting task" });
      });
  } else {
    res.status(400).json({});
  }
});

router.post("/addTask", function (req, res, next) {
  if (req.body && req.body.name && req.body.description && req.body.dueDate) {
    const newTask = new Tasks({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
    });
    newTask
      .save()
      .then((response) => 
        res.status(201).json({ message: "Task added successfully.", task: response })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error adding task." });
      });
  } else {
    res.status(400).json({ message: "Missing required fields." });
  }
});


module.exports = router;
