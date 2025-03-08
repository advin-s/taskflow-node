import Task from "../modals/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

export const createTasks = async (req, res) => {
  try {
    const { userId, todo, id } = req.body;
    const newtask = new Task({ userId, todo, id });
    await newtask.save();

    res.status(201).json({
      status: "success",
      tasks: newtask,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate({ id: +id }, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(updatedTask,id);
    
    res.status(201).json({
      status: "success",
      tasks: updatedTask,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndDelete({ id: +id });
    console.log(deletedTask);

    if (!deletedTask) {
     return res.status(404).json({
        status: "failed",
        message: "unable to find the todo",
      });
    }

    res.status(200).json({
        status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      err,
    });
  }
};
