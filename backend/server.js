const todoRoutes = require("./routes/todoRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
