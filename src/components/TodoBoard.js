import React from "react";
import TodoItem from "./TodoItem";
import "../App.css";

const TodoBoard = ({ todoList, updateTask, deleteTask }) => {
  return (
    <div>
      <div className="todo-text">할 일</div>
      {todoList.length > 0 ?
        (todoList.map((item) => <TodoItem item={item} updateTask={updateTask} deleteTask={deleteTask} />))
        :
        (<h2>There is no Item to show</h2>)}
      {/* <TodoItem/> will be here once we get the todoList */}

    </div>
  );
};

export default TodoBoard;
