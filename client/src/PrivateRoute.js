import React from 'react'
import {Route, Redirect, Component} from 'react-router-dom'

export default function PrivateRoute({ component: Component, handleChildFunc, ...rest }) {
    const user = "token from cookie";
    return <Route {...rest} render={(props) => (
        user !== null
            ? <Component {...props} user={user} handleChildFunc={handleChildFunc}/>
            : <Redirect to='/login' />
        )} 
    />
}