import React, { useState } from 'react';
import axios from 'axios'

export default function Login() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const login = (e) => {
        e.preventDefault()
        axios({
            method: "post",
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: 'http://localhost:4000/api/login'
        }).then(response => window.location.href = `/dashboard/${response.data.username}`)
    
    }
    return (
        <div>
        <h1>Login</h1>
        <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
        <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
        <button onClick={login}>Submit</button>
        </div>
    )
}