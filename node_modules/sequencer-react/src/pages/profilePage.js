import React, {useContext, useState, useEffect} from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import * as Tone from 'tone'
import '../profilePage.scss'
import ProfileSequences from '../ProfileSequences'
import ChatApp from '../ChatComponent'
import AuthContext from '../utils/Context/AuthContext'


//Needs to display saved sequences. Needs chat function, and needs sprucing up/
export default function Profile(props) {
    const userInfo = useContext(AuthContext)
    const sequences = userInfo.user.melodyRowOne
    useEffect(() => {
        console.log(userInfo)
    },[])
    console.log(userInfo)
    return (
        <div className='container-main'>
            <div className='profile-title'>
             <h1>{`Hello, ${userInfo.user.username}`}</h1>
            </div>
            <div className="profile-subtitle">
            <h2>Fancy seeing you here, friend!</h2>
            </div>
        <div>
        <ProfileSequences sequences={sequences} />
        <div className='button-div'>
             <Link to={`/dashboard/${userInfo.user.username}/new`}>
             <button className="profile-button">Make a new sequence</button>
             </Link>
        </div>
        </div>


        <div>
            <ChatApp />
        </div>
        </div>
    )
}