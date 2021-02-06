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
            <button onClick={toggler}>{`${word} Melody Sequence`}</button>
            <hr></hr>
            <div className={`grid ${visible}`}>
                <Melody visibility={props.visibility} columnIndex={props.columnIndex}/>
            </div>
        </>
    )
}