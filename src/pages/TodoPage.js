import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const TodoPage = ({ user, setUser }) => {
    const [todoList, setTodoList] = useState([]);   // task 리스트 저장
    const [todoValue, setTodoValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getTasks = async () => {
        setIsLoading(true);
        const response = await api.get('/tasks');
        // console.log("taskList", response.data.data);
        setTodoList(response.data.data);
        setIsLoading(false);
    }

    const addTask = async () => {
        try {
            const response = await api.post('/tasks', { task: todoValue, isComplete: false });
            if (response.status === 200) {
                console.log("성공");
                // 1. 입력한 값이 안 사라짐
                setTodoValue("");
                // 2. 추가한 값이 안 보임
                getTasks();
            }
            else {
                throw new Error("task can not be added");
            }
        } catch (err) {
            console.log("error", err);
        }
    }

    const updateTask = async (id) => {
        try {
            const task = todoList.find((item) => item._id === id);
            const response = await api.put(`/tasks/${id}`, { isComplete: !task.isComplete });

            if (response.status === 200) {
                console.log("성공");

                getTasks();
            }
            else {
                throw new Error("task can not be updated");
            }
        } catch (err) {
            console.log("error", err);
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await api.delete(`/tasks/${id}`);

            if (response.status === 200) {
                console.log("성공");

                getTasks();
            }
            else {
                throw new Error("task can not be deleted");
            }
        } catch (err) {
            console.log("error", err);
        }
    }

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
    }

    const goToProfile = () => {
        console.log(user);
        navigate("/profile");
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Container>
            <div className="display-right">
                <div>
                    <button className="button-delete" onClick={goToProfile}>
                        <img src="https://cdn-icons-png.flaticon.com/128/1371/1371359.png" />
                    </button>
                </div>
                <div>
                    {
                        user ?
                            (<Row className="logout-button" onClick={logout}>
                                <Col>로그아웃</Col>
                            </Row>)
                            :
                            (<Row >
                                <Col>로그인</Col>
                            </Row>)
                    }
                </div>
            </div>
            <Row className="add-item-row">
                <Col xs={12} sm={11}>
                    <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        className="input-box"
                        value={todoValue}
                        onChange={(event) => setTodoValue(event.target.value)}
                    />
                </Col>
                <Col xs={12} sm={1}>
                    <button className="button-add" onClick={addTask}>
                        <img src="https://cdn-icons-png.flaticon.com/128/7915/7915468.png" />
                    </button>
                </Col>
            </Row>
            {isLoading ?
                (<div className='loading'><ClipLoader color="#CBC3E3" loading={isLoading} size={100} /></div>)
                :
                (<TodoBoard todoList={todoList} updateTask={updateTask} deleteTask={deleteTask} />)}
        </Container>
    );
};

export default TodoPage;