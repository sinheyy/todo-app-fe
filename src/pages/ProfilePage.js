import React from 'react'
import { Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ProfilePage = (user, setUser) => {
    const navigate = useNavigate();

    const goToMain = () => {
        navigate("/");
    }

    return (
        <div className='display-center'>
            <Row>
                <Col xs={12} className='profile-row'>⚙️프로필 확인⚙️</Col>
            </Row>
            <div className='profile-row'>
                <Row>
                    <Col xs={12}>이름 : {user.user.name}</Col>
                </Row>
                <Row>
                    <Col xs={12}>이메일 : {user.user.email}</Col>
                </Row>
                <button className='button-back' onClick={goToMain}>
                    돌아가기
                </button>
            </div>
        </div>
    )
}

export default ProfilePage
