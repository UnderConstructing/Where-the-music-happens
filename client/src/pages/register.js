import React, { useState } from 'react';
import API from "../utils/API"
export default function Register() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = () => {
        API.register({
            username: registerUsername,
            password: registerPassword
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