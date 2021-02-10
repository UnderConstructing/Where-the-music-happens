import React, { useState } from 'react';
import API from "../utils/API"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <div>
            <h1>Login</h1>
            <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
            <input type="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
            <button onClick={login}>Submit</button>
            <ToastContainer />
        </div>
    )
}