import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
    background-color: white;
    min-height: 90vh;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const Form = styled.form`
    margin-top: -40px;
    display: flex;
    flex-direction: column;
    width: 40vw;
    border: 3px solid #1D72C2;
    border-radius: 10px;
    padding: 60px 40px 50px 40px;
    box-shadow: 7px 7px 3px rgba(0,0,0,0.6);
`;

const LoginTitle = styled.h1`
    text-align: center;
    margin-bottom: 30px;
    color: #1D72C2;
`;

const Label = styled.label`
    margin-bottom: 10px;
`;

const Input = styled.input`
    border: 1px solid #CCCCCC;
    padding: 5px;
    margin-bottom: 10px;
    border-radius: 4px;
    outline: none;
`;

const PrimaryButton = styled.button`
    padding: 3px;
    background-color: #1D72C2;
    color: white;
    width: 173px;
    height: 42px;
    border-radius: 2px;
    margin-top: 10px;
`;

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        const payload = { email, password };
        props.handleLogin(payload);
    };

    return (
        <LoginContainer>
            <Form action="">
                <LoginTitle>Login</LoginTitle>

                <Label htmlFor="email">Email</Label>
                <Input name="email" value={email} onChange={handleEmailChange} type="email" placeholder="example@example.com" />

                <Label htmlFor="email">Password</Label>
                <Input name="password" value={password} onChange={handlePasswordChange} type="password" />

                <PrimaryButton onClick={handleClick}>Login</PrimaryButton>
            </Form>
        </LoginContainer>
    )
}

export default Login
