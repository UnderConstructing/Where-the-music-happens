import React, { useState } from 'react'
import Kick from './Kick'
import Snare from './SnareSequence'
import HiHat from './HiHat'
import OpenHh from './OpenHH'

export default function DrumDiv(props) {
    const [visible, setVisible] = useState("visible")
    const [word, setWord] = useState("Hide")

    const toggler = () => {
        if (visible === "visible") {
            setVisible("invisible")
            setWord("Show")
        }
        else {
            setVisible("visible")
            setWord("Hide")
        }
    }
    return (
        <>
            <button onClick={toggler}>{`${word} Drum Sequence`}</button>
            <div className={`grid ${visible}`}>
                <HiHat />
                <OpenHh />
                <Snare />
                <Kick />
            </div>
        </>
    )
}