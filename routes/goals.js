var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const Goals = require("../models/Goals");

let goals = [];

router.get("/getGoals", function (req, res, next) {
  Goals.find()
    .then((response) => {
      if (response.length === 0) {
        return res.status(200).json({ message: "No goals available." });
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({});
    });
});

router.delete("/deleteGoal/:id", function (req, res, next) {
  console.log(req.params.id);

  if (req.params && req.params.id) {
    let id = req.params.id;
    Goals.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
      .then((response) => {
        // res.status(200).json(response);
        if (response.deletedCount > 0) {
          res.status(200).json({ message: "Goal deleted successfully" });
        } else {
          res.status(404).json({ message: "Goal not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Error deleting goal" });
      });
  } else {
    res.status(400).json({});
  }
});

router.post("/addGoal", function (req, res, next) {
  if (req.body && req.body.name && req.body.description && req.body.dueDate) {
    const newGoal = new Goals({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
    });
    newGoal
      .save()
      .then((response) => res.status(201).json({message: "Goal added successfully", goal: response}))
      .catch((err) => {
        console.log(err);
        res.status(500).json({message: "Error adding goal"});
      });
  } else {
    res.status(400).json({ message: "Missing required fields." });
  }
});

module.exports = router;
