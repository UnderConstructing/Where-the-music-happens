import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import ChatApp from './ChatComponent'
import API from './utils/API'
import './profilePage.scss'
import { SequencerContextProvider, useSequencerContext, useSequencerContextUpdate } from './utils/Context/SequencerContext'
import AuthContext from './utils/Context/AuthContext'

export default function ProfileSequences({ sequences }) {
    const userInfo = useContext(AuthContext)
    const sequencerIndex = useSequencerContext()
    const changeIndex = useSequencerContextUpdate()
    useSequencerContextUpdate()
    console.log(sequencerIndex)

    

    //useEffect api call to get indexes of sequences from user.
    return (
            <div className='sequence-container'>
                {/* <h1>TIME</h1> */}
                {/* <Link>
            <button sequence={0} onClick={setIndex}>Get Context</button>
            </Link> */}
                {/* {will map little divs with img inside to represent the different sequences in user db.
            When we actually click the div, setContext from the 'index' prop, and then route to sequencer.
            On actual sequencer page, we need to make an api call using the context as a part of the req.body
            then if it returns null, we will use the json templates to map} */}
                {sequences.map((sequence, i) => {
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