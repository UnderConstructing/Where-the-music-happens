import React, {useContext} from 'react';
import * as Tone from 'tone'
import '../profilePage.scss'
import AuthContext from '../utils/Context/AuthContext'


//Needs to display saved sequences. Needs chat function, and needs sprucing up/
export default function Profile(props) {
    const userInfo = useContext(AuthContext)
    console.log(userInfo.user.username)
    return (
        <div>
            <h1  className='profile-title'>{`Hello, ${userInfo.user.username}`}</h1>
                <h2>Fancy seeing you here, friend!</h2>
        <div>
            <button className="profile-button">The button we share together!</button>
        </div>
        </div>
    )
}