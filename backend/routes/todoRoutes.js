const express = require("express");
const Todo = require("../models/todo");

const router = express.Router();

/* ADD TODO */
router.post("/add", async (req, res) => {
  try {
    const count = await Todo.countDocuments();

const todo = new Todo({
  title: req.body.title,
  order: count
});

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET ALL TODOS */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ order: 1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE TODO */
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// UPDATE TODO (toggle completed)
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE ORDER AFTER DRAG
router.put("/reorder", async (req, res) => {
  try {
    const { items } = req.body;

    const bulkOps = items.map(item => ({
      updateOne: {
        filter: { _id: item._id },
        update: { order: item.order }
      }
    }));

    await Todo.bulkWrite(bulkOps);
    res.json({ message: "Order updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
