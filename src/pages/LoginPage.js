import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";

const LoginPage = ({ user, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/user/login', { email, password });
            if (response.status === 200) {
                // 유저 정보 저장 - session storage
                setUser(response.data.user);
                sessionStorage.setItem("token", response.data.token);
                // token을 헤더에 넣어서 보냄
                api.defaults.headers["authorization"] = "Bearer " + response.data.token;
                setError("");

                navigate("/");
            }
            throw new Error(response.message);
        } catch (error) {
            setError(error.message);
        }
    }

    if (user) {
        return <Navigate to="/"></Navigate>;
    }

    return (
        <div className="display-center">
            <Form className="login-box" onSubmit={handleLogin}>
                <h1>로그인</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control type="email" placeholder="이메일을 입력해주세요" onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력해주세요" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>

                {error && <div className="red-error">{error}</div>}

                <div className="button-box">
                    <Button type="submit" className="button-primary">
                        로그인
                    </Button>
                    <span>
                        계정이 없다면? <Link to="/register">회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;