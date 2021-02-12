import React, { useState } from 'react'
import MelodyTwoRec from './MelodyTwoRec'

export default function MelodyDivTwoRec(props) {
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
            <div>
            <div className={`grid ${visible}`}>
                <MelodyTwoRec visibility={props.visibility} columnIndex={props.columnIndex}/>
            </div>
            </div>
        </>
    )
}