import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import ChatApp from './ChatComponent'
import API from './utils/API'
import './profilePage.scss'
import SequencerContext from './utils/Context/SequencerContext'
import AuthContext from './utils/Context/AuthContext'

export default function ProfileSequences({sequences}) {
    const userInfo = useContext(AuthContext)
    const [sequencerIndex, setSequencerIndex] = useState(0)
    const setIndex = (e) => {
        setSequencerIndex(e.target.id)
        SequencerContext.sequencerIndex = sequencerIndex
    }

    //useEffect api call to get indexes of sequences from user.
    console.log(sequences[0][0].id)
    return (
        <div className='sequence-card red'>
            {/* <h1>TIME</h1> */}
            <Link>
            <button sequence={0} onClick={setIndex}>Get Context</button>
            </Link>
            {/* {will map little divs with img inside to represent the different sequences in user db.
            When we actually click the div, setContext from the 'index' prop, and then route to sequencer.
            On actual sequencer page, we need to make an api call using the context as a part of the req.body
            then if it returns null, we will use the json templates to map} */}

            {sequences.map((sequence) => {
                {console.log(`test ${sequence}`)}
                <div key={`sequence${sequence[0].id}`}sequence={sequence[0].id}>
                    Sequencer
                </div>
            })} 
        </div>
    )
}