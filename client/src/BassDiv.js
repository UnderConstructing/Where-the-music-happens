import React, { useState } from 'react'
import Bass from './Bass'

export default function BassDiv(props) {
    const [visible, setVisible] = useState("visible")
    const [word, setWord] = useState("Hide")

    const toggler = () => {
        if (visible === "visible" && word === "Hide") {
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
            <button className="hide-button" onClick={toggler}>{`${word} Bass Sequence`}</button>
            <div className={`grid ${visible}`}>
                <BassRec />
            </div>
        </>
    )
}