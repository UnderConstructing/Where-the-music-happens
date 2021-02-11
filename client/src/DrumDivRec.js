import React, { useState } from 'react'
import KickRec from './KickRec'
import SnareRec from './SnareSequenceRec'
import HiHatRec from './HiHatRec'
import OpenHhRec from './OpenHhRec'

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
            <button className="hide-button" onClick={toggler}>{`${word} Drum Sequence`}</button>
            <div>
            <div className={`grid ${visible}`}>
                <HiHatRec />
                <OpenHhRec />
                <SnareRec />
                <KickRec />
            </div>
            </div>
        </>
    )
}