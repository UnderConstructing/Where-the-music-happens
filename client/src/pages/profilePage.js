import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../profilePage.scss'
import ProfileSequences from '../ProfileSequences'
import ChatApp from '../ChatComponent'
import AuthContext from '../utils/Context/AuthContext'


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

                        {/* { userInfo &&
                        userInfo.receivedsnareArray.map((sequence, i) => {
                            return (
                                <Link to={`/dashboard/${userInfo.username}/received/${i}`}>
                                    <div className="inbox-item" key={sequence.id + i} id={i}>
                                        <h3> &#x1F4E5; Sequence &#9835;</h3>
                                        <p>from {userInfo.author[i]}</p>
                                    </div>
                                </Link>
                            )
                        })} */}
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