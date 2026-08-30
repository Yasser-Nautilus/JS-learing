export class TaskStore {
  constructor() {
    this.tasks = new Map();
    this.nextId = 1;
  }
  
  addTask(title) {
    const id = this.nextId;
    const task = { id, title, done: false };
    this.tasks.set(id, task);
    this.nextId++;
    return task;
  }
  
  getAllTasks() {
    return Array.from(this.tasks.values());
  }
  
  completeTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      task.done = true;
      return task;
    } else return null;
  }
  
  deleteTask(id) {
    return this.tasks.delete(id);
  }
}
