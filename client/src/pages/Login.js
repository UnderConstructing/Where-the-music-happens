import React, { useState } from 'react';
import API from "../utils/API"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import '../Login.css';

import '../Login.css';

export default function Login() {
    
    const [loggedIn, setLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const login = (e) => {
        e.preventDefault()
            API.login({
            username: loginUsername,
            password: loginPassword
        })
        .then(response => {
            console.log(response)
            if (!response.data.username) {
                toast("Login or password doesn't match, please try again.")}
            else {
                setUserInfo(userInfo)
                window.location.href = `/profile/${response.data.username}`
            }
        })
        .catch(err => toast("Login not successful. Try again later."))
    }

    return (
        <div className="login-container">
        <div className="login-style">
            <h1>Login</h1>
            <input className="login-input" placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
            <input className="login-input" type="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
            <Link to={`/profile/${loginUsername}`}>
                <button className="login-button" onClick={login}>Submit</button>
            </Link>
            <ToastContainer />
            <h3 className="login-p">Don't have an account? Sign up here</h3>
            <p className="main-p">
        <button onClick={() => window.location.href = '/registeruser'} className="main-a">Sign up</button>
      </p>
        </div>
        </div>
    )
}