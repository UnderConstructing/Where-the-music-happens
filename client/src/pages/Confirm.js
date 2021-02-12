import React, { useState } from 'react';
import API from "../utils/API"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Login.css';
import LoginToast, {showToast} from '../LoginToast'

export default function Confirm() {
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
                window.location.href = `/profile/${response.data.username}`
            }
        })
        .catch(err => toast("Hmm... something went wrong. Try again later."))
    }
    return (
        <div className="login-container">
        <div className="login-style">
            <p>Please Confirm your username and password</p>
            <input className="login-input" placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
            <input className="login-input" type="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
            <button className="login-button" onClick={login}>Finish Registration!</button>
            <LoginToast />
        </div>
        </div>
    )
}