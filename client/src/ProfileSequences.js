import React, { useContext } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";

import './profilePage.scss'
import AuthContext from './utils/Context/AuthContext'

export default function ProfileSequences({ sequences }) {
    const userInfo =  useContext(AuthContext)
    console.log(`profile Sequences ${userInfo}`)


    

    //useEffect api call to get indexes of sequences from user.
    return (
            <div className='sequence-container'>
                {userInfo.user.snareArray.map((sequence, i) => {
                    return (
                        <Link to={`/dashboard/${userInfo.user.username}/${i}`}>
                            <button key={i} id={i} onClick={changeIndex} className="sequence-card ">
                                <p className='music-notes'>&#9835;</p>
                            </button>
                        </Link>
                    )
                })}
            </div>
    )
}