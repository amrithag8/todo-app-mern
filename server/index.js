const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
let todoList = [{ id: uuidv4(), todo: "Homework", completed: false }];

app.use(cors());
app.use(express.json());

app.get("/api/todo", (req, res) => {
  res.json(todoList);
});

app.post("/api/todo", (req, res) => {
  const { todo } = req.body;

  if(!("todo" in req.body)){
    return res.status(400).json({Message: `${JSON.stringify(req.body)}: This attribute is not accepted. Required attribute: todo`})
  }

  todoList.push({ id: uuidv4(), todo: todo, completed: false });
  // console.log("todo is", todoList);

  res.json(todoList);
});

app.put("/api/todo", (req, res) => {
  const { id, todo } = req.body;

  const todoIndex = todoList.findIndex((item) => {
    return item.id === id;
  });

  
  if (todoIndex !== -1) {
    todoList[todoIndex].todo = todo;
    return res.json(todoList);
  }

  

  res.json("Item with that id not found");
});

app.delete("/api/todo", (req, res) => {
  const { ids } = req.body;

  let filterArr = todoList.filter((todos) => {
    return todos.id !== ids;
  });

  todoList = filterArr;
  res.json(todoList);
});

const PORT = 3006;

app.listen(PORT, () => console.log(`terminal started on ${PORT}`));
