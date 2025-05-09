var express = require("express");
var router = express.Router();

let tasks = [
  { id: 1, name: "Task 1", description: "Description for Task 1" },
  { id: 2, name: "Task 2", description: "Description for Task 2" },
];

router.get("/getTasks", function (req, res, next) {
  res.json(tasks);
});

router.delete("/deleteTask/:id", function (req, res, next) {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: "Task deleted successfully" });s
});

router.post("/addTask", function (req, res, next) {
  // Verificamos que tasks exista y tenga elementos con id numérico válido
  const ids = tasks
    .map((task) => Number(task.id)) // Convertimos a número por si acaso
    .filter((id) => !isNaN(id) && id > 0); // Filtramos ids válidos positivos

  const lastId = ids.length > 0 ? Math.max(...ids) : 0;

  const newTask = {
    id: lastId + 1,
    name: req.body.name,
    description: req.body.description,
  };
  tasks.push(newTask);
  res.json(newTask);
});


module.exports = router;
