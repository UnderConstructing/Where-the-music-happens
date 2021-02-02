import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../utils/Context/AuthContext'
import API from '../utils/API'

export default function Grid(props) {
    const [value, setValue] = useState(100)
    useEffect(() => {
        console.log(value)
    }, [value])
    const userInfo = useContext(AuthContext)
    console.log(userInfo)
    function logout() {
        API.logout()
            .then(res => window.location.href = '/')
    }
    return (
        <button onClick={logout}>logout</button>
    )
}