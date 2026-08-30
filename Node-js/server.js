import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./taskModel.js";

dotenv.config();


const app = express();
app.use(express.json());

app.post("/tasks", async (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const newTask = await Task.create({ title, priority });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: "Failed to create task" });
  }
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks)
});

app.patch("/tasks/:id/complete", (req, res) => {
  const id = Number(req.params.id);
  if(Task.findById(id)){
  const updated = await Task.findByIdAndUpdate(
    id,
    { done: true },
    { returnDocument: 'after' }, );
}else
  res.status(404).send("Not Found")
});
  
app.delete("/tasks/:id",async (req,res)=>{



})

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startServer();
