import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (password !== secPassword) {
                throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
            }
            
            const response = await api.post('/user', {name, email, password});
            console.log("rrrrr", response);
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="display-center">
            
            <Form className="login-box" onSubmit={handleSubmit}>
                <h1>회원가입</h1>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="string" placeholder="이름" onChange={(event) => setName(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control type="email" placeholder="이메일을 입력해주세요" onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호 재확인</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 다시 입력해주세요" onChange={(event) => setSecPassword(event.target.value)} />
                </Form.Group>

                {error && <div className="red-error">{error}</div>}

                <Button className="button-primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;