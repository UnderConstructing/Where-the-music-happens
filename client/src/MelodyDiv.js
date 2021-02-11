import React, { useState } from 'react'
import Melody from './Melody'

export default function MelodyDiv(props) {
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
            <button className="hide-button" onClick={toggler}>{`${word} Melody Sequence`}</button>
            <div className={`grid ${visible}`}>
                <Melody visibility={props.visibility} columnIndex={props.columnIndex}/>
            </div>
        </>
    )
}