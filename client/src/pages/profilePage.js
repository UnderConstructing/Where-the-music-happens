import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../profilePage.scss'
import ProfileSequences from '../ProfileSequences'
import ChatApp from '../ChatComponent'
import AuthContext from '../utils/Context/AuthContext'
import ReceivedSequences from '../ReceivedSequences'

//Needs to display saved sequences. Needs chat function, and needs sprucing up/
export default function Profile(props) {
    console.log("problems")
    const userInfo = useContext(AuthContext) 
    useEffect(() => {
        console.log(userInfo)
    }, [])
    console.log(userInfo)
    if(!userInfo) return <h1>Loading...</h1>
    return (
        <div className='container-main'>
            <div className='profile-title'>
                {`Hello, ${userInfo.username}`}
                <div className="inbox-container">
                    <h1 className='inbox-title'>INBOX</h1>
                    <div className='inbox'>

                        <ReceivedSequences />
                    </div>
                </div>
            </div>
            <div className="profile-subtitle">
                <div>
                    <ChatApp />
                </div>
            </div>
            {/* <div> */}
            <ProfileSequences />
            <div className='button-div'>
            </div>
            {/* </div> */}



        </div>
    )
}