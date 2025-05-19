var express = require("express");
var router = express.Router();

let goals = [
  { id: 1, name: "Goal 1", description: "Description for Goal 1" },
  { id: 2, name: "Goal 2", description: "Description for Goal 2" },
];

router.get("/getGoals", function (req, res, next) {
  res.json(goals);
});

router.delete("/deleteGoal/:id", function (req, res, next) {
  const goalId = parseInt(req.params.id);
  const goalIndex = goals.find((goal) => goal.id === goalId);
  console.log("goalIndex", goalIndex);
  if (!goalIndex) {
    return res.status(400).json({ message: "Goal not found" });
  } else {
    goals = goals.filter((goal) => goal.id !== goalId);
    res.json({ message: "Goal deleted successfully" });
  }
});

router.post("/addGoal", function (req, res, next) {
  // Verificamos que goals exista y tenga elementos con id numérico válido
  const ids = goals
    .map((goal) => Number(goal.id)) // Convertimos a número por si acaso
    .filter((id) => !isNaN(id) && id > 0); // Filtramos ids válidos positivos

  const lastId = ids.length > 0 ? Math.max(...ids) : 0;

  const newGoal = {
    id: lastId + 1,
    name: req.body.name,
    description: req.body.description,
  };
  goals.push(newGoal);
  res.json(newGoal);
});

module.exports = router;
