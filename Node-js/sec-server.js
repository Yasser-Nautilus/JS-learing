import { TaskStore } from "./taskStore.js";
import express from "express";

const store = new TaskStore();
const app = express();
const requestLogger = (req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
};
const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.headers["x-role"];
    if (!role || !allowedRoles.has(role)) {
      res.status(403).send("Forbidden");
      return;
    }
    next();
  };
};
app.use(requestLogger);
app.use(express.json());

app.post("/tasks", (req, res) => {
  const title = req.body.title;
  if (!title) res.status(400).send("The title not found");
  else {
    const newTask = store.addTask(title);
    res.status(201).json(newTask);
  }
});

app.get("/tasks", (req, res) => {
  const tasks = store.getAllTasks();
  res.json(tasks);
});

app.patch("/tasks/:id/complete", (req, res) => {
  const id = Number(req.params.id);
  const completed = store.completeTask(id);
  if (completed) res.status(200).json(completed);
  else res.status(404).send("Not Found");
});

app.delete("/tasks/:id", roleCheck(new Set(["admin"])), (req, res) => {
  const id = Number(req.params.id);
  const deleted = store.deleteTask(id);
  if (deleted) {
    res.status(200).send("Task deleted");
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000 ");
});
