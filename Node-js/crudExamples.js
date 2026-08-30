import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./taskModel.js";

dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("========== CREATE ==========");
  const task1 = await Task.create({ title: "Buy milk", priority: "high" });
  console.log("Created:", task1._id);

  // طريقة تانية لنفس النتيجة (بديل new Task() + save()):
  // Task.create() بتعمل الاتنين في سطر واحد

  console.log("========== READ ==========");

  // هات كل الـ tasks
  const allTasks = await Task.find();
  console.log("All tasks count:", allTasks.length);

  // هات task واحدة بالـ _id
  const oneTask = await Task.findById(task1._id);
  console.log("Found by id:", oneTask.title);

  // هات بشرط معين (زي WHERE في SQL)
  const highPriorityTasks = await Task.find({ priority: "high" });
  console.log("High priority count:", highPriorityTasks.length);

  // هات أول واحدة تطابق شرط
  const firstDone = await Task.findOne({ done: true });
  console.log("First done task:", firstDone); // ممكن يطلع null لو مفيش

  console.log("========== UPDATE ==========");

  // عدّل حقل واحد، وارجع النسخة الجديدة (بعد التعديل)
  const updated = await Task.findByIdAndUpdate(
    task1._id,
    { done: true },
    { new: true }, // ⬅️ من غيرها هترجع النسخة القديمة قبل التعديل
  );
  console.log("Updated:", updated.done);

//   console.log("========== DELETE ==========");

//   const deleted = await Task.findByIdAndDelete(task1._id);
//   console.log("Deleted:", deleted ? deleted.title : "not found");

//   // تأكيد إنها اتمسحت فعلاً
//   const checkAfterDelete = await Task.findById(task1._id);
//   console.log("After delete, findById returns:", checkAfterDelete); // null

  await mongoose.disconnect();
}

main();
