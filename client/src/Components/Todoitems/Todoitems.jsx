import { useState } from "react";
import "./Todoitem.css";
import axios from "axios";
export const Todoitems = ({ item, todoList, setTodoList }) => {
  const [completedTodo, setcompletedTodo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [editValue, setEditValue] = useState();

  const deleteHandler = async(_id) => {
    const res=await axios("https://todo-app-mern-phi.vercel.app/api/todo", {
      method: "DELETE",
      data:{
        ids:_id
      }
    })
    setTodoList(res.data);
    // localStorage.setItem("TODO", JSON.stringify(filteredTodo));
  };

  const completeTaskHandler = (_id) => {
    let completedUpdate = todoList.map((item) => {
      if (item.id === _id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setTodoList(completedUpdate);
    // localStorage.setItem("TODO", JSON.stringify(completedUpdate));
  };

  const editTodoHandler = (_id) => {
    todoList.map((item) => {
      if (item.id === _id) {
        return setEditTodo(!editTodo);
      }
    });
  };

  const saveClickHandler = async(id) => {
    if (editValue === "") {
      alert("Please enter some value");
    } else {
      const response=await axios("https://todo-app-mern-phi.vercel.app/api/todo", {
        method: "PUT",
        data:{
          todo: editValue,
          id:id
        }
      })

      // localStorage.setItem("TODO", JSON.stringify(updatedArr));

      setTodoList(response.data);
      
      setEditTodo(false);
    }
  };

  return (
    <>
      <div className="todo-item">
        {editTodo ? (
          <div className="edit">
            <input
              type="text"
              name="edit-text"
              defaultValue={item.todo}
              onChange={(event) => setEditValue(event.target.value)}
            />
            <button
              className="save-button"
              onClick={() => saveClickHandler(item.id)}
            >
              SAVE
            </button>
            <button
              className="cancel-button"
              onClick={() => setEditTodo(false)}
            >
              CANCEL
            </button>
          </div>
        ) : (
          <>
            <div
              className={item.completed ? "completed" : "todolist"}
              onClick={() => completeTaskHandler(item.id)}
            >
              {item.todo}{" "}
            </div>
            <img
              src="./images/image7.png"
              alt=""
              className="edit-image"
              onClick={() => editTodoHandler(item.id)}
            />
            <img
              src="./images/image9.png"
              alt=""
              className="delete-image"
              onClick={() => deleteHandler(item.id)}
            />
          </>
        )}
      </div>
    </>
  );
};
