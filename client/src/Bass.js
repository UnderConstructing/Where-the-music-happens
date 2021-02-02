import React from 'react'
import bassArray from './templates/bass.json'

export default function Bass() {
    function activateBassNote(e) {
        if (bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
            bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
        }
        else {
            bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
        }
    }
    return (
        <div key="bass" >
            {bassArray.map((row, i) => (
                <div key={row + row[i].note} id={row[i].note} className="row">
                    {row.map(subdivision => (
                        <div className='parent'>
                            <input type="checkbox" text={subdivision.note} onChange={activateBassNote} key={`bass${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box col${subdivision.id}`} id={subdivision.id}></input>
                            <label></label>
                        </div>
                    )
                    )}
                </div>
            )
            )}
        </div>

    )
}