import React, { useState, useContext, useEffect } from 'react';
import API from "../utils/API"
import '../register.css'
import kickArray from '../templates/kick.json';
import snareArray from '../templates/snare.json';
import melodyArray from '../templates/melody.json';
import melodyArrayTwo from '../templates/melodytwo.json'
import hihatArray from '../templates/hihat.json'
import openHhArray from '../templates/openhh.json'
import bassArray from '../templates/bass.json'
import {Link} from 'react-router-dom'


export default function Register(props) {
    const [loggedIn, setLoggedIn] = useState({username: ''})
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    let data = null
    const register = () => {
        API.register({
            username: registerUsername,
            password: registerPassword}).then(response => 
                {
            API.saveTone({
            username: registerUsername,
            hihatArray: hihatArray,
            openHhArray: openHhArray,
            snareArray: snareArray,
            kickArray: kickArray,
            melodyRowOne: melodyArray[0],
            melodyRowTwo: melodyArray[1],
            melodyRowThree: melodyArray[2],
            melodyRowFour: melodyArray[3],
            melodyRowFive: melodyArray[4],
            melodyRowSix: melodyArray[5],
            melodyRowSeven: melodyArray[6],
            melodyRowEight: melodyArray[7],
            melodyRowNine: melodyArray[8],
            melody2RowOne: melodyArrayTwo[0],
            melody2RowTwo: melodyArrayTwo[1],
            melody2RowThree: melodyArrayTwo[2],
            melody2RowFour: melodyArrayTwo[3],
            melody2RowFive: melodyArrayTwo[4],
            melody2RowSix: melodyArrayTwo[5],
            melody2RowSeven: melodyArrayTwo[6],
            melody2RowEight: melodyArrayTwo[7],
            melody2RowNine: melodyArrayTwo[8],
            bassRowOne: bassArray[0],
            bassRowTwo: bassArray[1],
            bassRowThree: bassArray[2],
            bassRowFour: bassArray[3],
            bassRowFive: bassArray[4],
            bassRowSix: bassArray[5],
            bassRowSeven: bassArray[6],
            bassRowEight: bassArray[7],
            bassRowNine: bassArray[8]
        }).then(response => {
            })
        })
    };
    useEffect(() => {
        setLoggedIn(registerUsername)
        console.log(loggedIn)
    }, [registerUsername])

    return (

        <div className="register-style">
            <h1 className="register-title">Register</h1>
            <input className="register-input" placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
            <input className="register-input" placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
            <Link to={`/profile/${loggedIn}`}>
            <button className="register-button" onClick={register}>Submit</button>
            </Link>
        </div>
    )
}