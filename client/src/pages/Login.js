import React, { useState } from 'react';
import API from "../utils/API"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Login.css';
export default function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const login = (e) => {
        e.preventDefault()
        API.login({
            username: loginUsername,
            password: loginPassword
        })
        .then(response => window.location.href = `/profile/${response.data.username}`)
        .catch(err => toast("Login not successful. Sorry SUCKAAAAAAA"))
    }
    return (
        <div className="login-style">
            <h1>Login</h1>
            <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
            <input type="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
            <button className="login-button" onClick={login}>Submit</button>
            <ToastContainer />
            <h3 className="signup-style">Don't have an account? Sign up here</h3>
            <p className="main-p">
        <button onClick={() => window.location.href = '/registeruser'} className="main-a">Sign up</button>
      </p>
        </div>
    )
}