import React from 'react';
import kickArray from './kick.json';
import snareArray from './snare.json';
import * as Tone from 'tone';
import Box from './Box'



export default function App1() {
  console.log(snareArray)
  // Tone.Transport.scheduleRepeat(sequencer, "4n")
  let index = 0

  function sequencer() {
    let step = index % 8
      if (kickArray[step].isActive === true) {
        kickDrum.triggerAttackRelease("C2", "16n")
      }

    console.log(step)
    index++
  }

  function activate(event) {
    console.log("id= " + event.target.id)
    if (kickArray[event.target.id-1].isActive === false) {
      kickArray[event.target.id-1].isActive = true
    }
    else {
      kickArray[event.target.id-1].isActive = false
    }
    console.log(kickArray)
  }

  return (
    <div>
      <h1>Map</h1>
      {snareArray.map(note => {
        return (
        <Box onClick={activate} isActive={note.isActive}>{note.note}</Box>
        )
      })}

    </div>

  )
}
