import React, { useState } from 'react'
import MelodyTwo from './MelodyTwo'

export default function MelodyDivTwo(props) {
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
                <MelodyTwo visibility={props.visibility} columnIndex={props.columnIndex}/>
            </div>
        </>
    )
}