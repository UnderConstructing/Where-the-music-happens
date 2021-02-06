import React, {useState}from 'react'
import melodyArrayTwo from './templates/melodytwo.json'

export default function Melody() {
    function activateNote(e) {
        if (melodyArrayTwo[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
          melodyArrayTwo[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
        }
        else {
          melodyArrayTwo[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
        }
    }

    return (
        <div key="melodytwo" className="melody2">
        {melodyArrayTwo.map((row, i) => (
          <div key={row + row[i].note} id={row[i].note} className="row">
            {row.map(subdivision => (
              <div key={`${subdivision.id} key`}className='parent'>
                <input type="checkbox" text={subdivision.note} onChange={activateNote} key={`Melody${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box col${subdivision.id} `} id={subdivision.id}></input>
              <label key={`${subdivision.id}label`}></label>
                <span key={`${subdivision.id}span`}></span>
              </div>
            )
            )}
          </div>
        )
        )}
      </div>
    )
}