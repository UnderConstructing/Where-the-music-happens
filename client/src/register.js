import React, { useState } from 'react';
import axios from 'axios'
export default function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = () => {
        axios({
            method: "post",
            data: {
                username: registerUsername,
                password: registerPassword
            },
            withCredentials: true,
            url: 'http://localhost:4000/api/register'
        }).then(res => console.log(res))
    }
    return (
        <div>
        <h1>Register</h1>
        <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
        <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
        <button onClick={register}>Submit</button>
        </div>
    )
}