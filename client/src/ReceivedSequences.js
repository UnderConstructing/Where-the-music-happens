import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './utils/Context/AuthContext'

export default function ReceivedSequences() {
    const userInfo = useContext(AuthContext)

    if (!userInfo.user.receivedsnareArray) {
        return <div></div>
    }
    return (

        userInfo.receivedsnareArray.map((sequence, i) => {
            return (
                <Link to={`/dashboard/${userInfo.username}/received/${i}`}>
                    <div className="inbox-item" key={sequence.id + i} id={i}>
                        <h3> &#x1F4E5; Sequence &#9835;</h3>
                        <p>from {userInfo.author[i]}</p>
                    </div>
                </Link>
            )
        })
    )
}
