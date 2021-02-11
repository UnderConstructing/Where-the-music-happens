import React, { useEffect, useContext } from 'react'
import ReactPlayer from 'react-player'
import API from '../utils/API'
import AuthContext  from '../utils/Context/AuthContext'


export default function Tutorial() {
    const userInfo = useContext(AuthContext)
    
    return (
        <div>
            <ReactPlayer url="https://www.youtube.com/watch?v=7sDY4m8KNLc">

            </ReactPlayer>
            <button ></button>
        </div>
    )
}