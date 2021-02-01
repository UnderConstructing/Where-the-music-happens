import React from 'react'
import kickArray from './templates/kick.json'

export default function Kick() {
    function activateKick(event) {
        console.log(event.target)
        if (kickArray[event.target.id - 1].isActive === false) {
          kickArray[event.target.id - 1].isActive = true
        }
        else {
          kickArray[event.target.id - 1].isActive = false
        }
        console.log(event.target)
      }
    return (
        <div key="kick" className="row snare">
        {kickArray.map((note) => (
          <div className="parent">
            <input type="checkbox" text={note.note} onClick={activateKick} key={note.id + 8} className="box" id={note.id}>
            </input>
            <label></label>
          </div>
        ))}
      </div>
    )
}