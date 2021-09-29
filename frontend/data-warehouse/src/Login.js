import { Button, TextField } from '@material-ui/core';
import React from 'react';
import "./Login.css";

function Login() {
    return (
        <div className="login-page">
            <div className="login">
                <h1>Login</h1>
                <form className="login__form">
                    <TextField margin="normal" id="user" label="user" variant="outlined" />
                    <TextField margin="normal" id="password" label="password" variant="outlined" />
                    <div className="login__btn-container">
                        <Button variant="contained" color="primary">Login</Button>
                        <Button variant="contained" color="secondary">Register</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
