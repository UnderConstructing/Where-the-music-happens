import React from 'react';
import './App.css'
import * as Tone from 'tone'
import Bell from './templeBell.mp3'

export default function Profile() {

        const note = new Tone.Player(Bell)

    function playNote() {
        Tone.start()
        note.start()
    }
    

    return (
        <>
            <h1>Profile Page</h1>
            <button onClick={playNote}>Play Note</button>
        </>
    )
}