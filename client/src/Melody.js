import React, {useEffect, useState} from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import melodyArray from './templates/melody.json'
import useInterval from './useInterval'

export default function Melody(props) {
  

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
              <div key={`key${subdivision.id}`} col={subdivision.id}id={subdivision.id} className="parent">
                <input type="checkbox" text={subdivision.note} onChange={activateNote} key={`Melody${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box col${subdivision.id}`} id={subdivision.id}></input>
                <label></label>
                <span columnIndex={props.columnIndex} className={`${!props.visibility ? "invisible" : ""} ${subdivision.id - 1 === props.columnIndex ? "active": ""}`}></span>
              </div>
            )
            )}
          </div>
        )
        )}
      </div>
    )
}