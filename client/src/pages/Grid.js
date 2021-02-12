import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../utils/Context/AuthContext'
import API from '../utils/API'

export default function Grid(props) {

    const userInfo = useContext(AuthContext)
    function logout() {
        API.logout()
            .then(res => {
                localStorage.removeItem('user')
                window.location.href = '/'
        })

    }
    return (
        <button onClick={logout}>logout</button>
    )
}