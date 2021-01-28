import React, { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import axios from 'axios'

export default function Grid (props) {
    console.log(props.match.params.user)
    const userInfo = useContext(AuthContext)
    console.log(userInfo)
    function logout() {
        axios.get('/logout')
        .then(res => window.location.href = '/')
    }
    return (
        <div>
            <h1>home</h1>
            <button onClick={logout}>logout</button>
        </div>
    )
}