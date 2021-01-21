import React, { useState } from 'react'
import * as Tone from 'tone';

let indexNumber = 0

function App() {
  const [playArray, changeArray] = useState({
    columns: [
      {
        id: 1,
        isActive: false
      },
      {
        id: 2,
        isActive: false
      },
      {
        id: 3,
        isActive: false
      },
      {
        id: 4,
        isActive: false
      }
    ]
  });

  function toggleActive(index) {
    let arrayCopy = [...playArray.columns]
    arrayCopy[index].isActive ? (arrayCopy[index].isActive = false) : (arrayCopy[index].isActive = true)
    changeArray({ ...playArray, columns: arrayCopy })
    console.log(playArray)
  }

  function testSynth() {
    synth.triggerAttackRelease("C4", "8n")
  }

  const synth = new Tone.Synth().toDestination()
  Tone.Transport.scheduleRepeat(repeat, '2n')

  function startSequencer() {
    Tone.Transport.start()
  }


  function repeat(time, cb) {
    let step = indexNumber % 4
    // let step = indexNumber % 4
      if (playArray.columns[step].isActive === true) {
        synth.triggerAttackRelease('C4', "16n", time)
      }
    //   console.log(step)
      indexNumber++
      console.log(step)
    }
  

  return (
    <div>
      {playArray.columns.map((item, index) => (
        <button id={playArray.columns.id} key={index} onClick={() => toggleActive(index)}>NOTE</button>))}
      <div>
        <button onClick={startSequencer}>Start</button>
      </div>
      <button onClick={testSynth}>Test</button>
    </div>
  )
}



export default App