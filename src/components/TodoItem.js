import React from "react";
import { Col, Row } from "react-bootstrap";
import "../App.css";

const TodoItem = ({ item, updateTask, deleteTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>
          <div>by. {item.author.name}</div>
          <div>
            <button className="button-delete" onClick={() => updateTask(item._id)}>
              {item.isComplete
                ?
                <img src="https://cdn-icons-png.flaticon.com/128/8206/8206354.png" />
                :
                <img src="https://cdn-icons-png.flaticon.com/128/8206/8206394.png" />}
            </button>
            <button className="button-delete" onClick={() => deleteTask(item._id)}>
              <img src="https://cdn-icons-png.flaticon.com/128/8206/8206356.png" />
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
