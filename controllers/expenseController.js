import Expense from "../modals/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const tasks = await Expense.find();
    res.status(200).json({
      status: "success",
      tasks,
    });
  } catch (err) {
    res.status(500).json({
        status:"failed",
        error:err
    })
  }
};
