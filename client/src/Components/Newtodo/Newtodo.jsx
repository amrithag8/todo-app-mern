import "./Newtodo.css";
import { useEffect } from "react";
import axios from "axios";
export const Newtodo = ({ todo, setTodo, todoList, setTodoList }) => {
  const onClickHandler = async() => {
    if (todo === "") {
      alert("Please enter some value");
    } else {
      const response=await axios("https://todo-app-mern-phi.vercel.app/api/todo", {
        method:"POST", 
        
          data:{
            todo: todo
          }
        
      })
      
      setTodoList(response.data);
      // let newList = { todos: todo, id: Date.now(), completed: false };
      // let allNewList = [...todoList, newList];
      // // console.log("values are", allNewList);
      // localStorage.setItem("TODO", JSON.stringify(allNewList));
    }
    // setTodoList((prev)=>{
    //   return [...prev, response.data]});
      // return setTodoList(response.data);
    setTodo("");


    
  };

  // useEffect(() => {
  //   let localStorageData = localStorage.getItem("TODO");
  //   localStorageData && setTodoList(JSON.parse(localStorageData));
  // }, []);

  return (
    <div className="newtodo">
      <p>Todo List</p>
      <div className="input-text">
        <input
          type="text"
          name="text"
          placeholder="New todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={onClickHandler}>ADD TODO</button>
      </div>
    </div>
  );
};
