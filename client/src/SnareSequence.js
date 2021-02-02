import React from 'react'
import snareArray from './templates/snare.json'

export default function Snare() {
    function activateSnare(event) {
        console.log("id= " + event.target.id)
        if (snareArray[event.target.id - 1].isActive === false) {
          snareArray[event.target.id - 1].isActive = true
        }
        else {
          snareArray[event.target.id - 1].isActive = false
        }
        console.log(`test is active: ${snareArray[event.target.id - 1].isActive}`)
      }
    return(
    <div key="snare" className="row snare">
    {snareArray.map((note) => (
      <div className="parent">
        <input type="checkbox" text={note.note} onClick={activateSnare} key={"snare" + note.id} className="box" id={note.id}>
        </input>
        <label></label>
      </div>
    ))}
  </div>
  )
}