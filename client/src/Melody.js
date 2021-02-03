import React from 'react'
import melodyArray from './templates/melody.json'

export default function Melody() {
    
    let colArray = []
    function activateNote(e) {
        if (melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
          melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
        }
        else {
          melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
        }
    }

    return (
        <div key="melody" className="melody">
        {melodyArray.map((row, i) => (
          <div key={row + row[i].note} id={row[i].note} className="row">
            {row.map(subdivision => (
              <div className='parent'>
                <input type="checkbox" text={subdivision.note} onChange={activateNote} key={`Melody${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box col${subdivision.id} `} id={subdivision.id}></input>
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