import React from 'react';
import kickArray from './kick.json';
import snareArray from './snare.json';
import * as Tone from 'tone';
import Box from './Box'
import { isNote, MembraneSynth } from 'tone';
import Row from './Row'
import melodyArray from './melody.json'
import './App.css'

export default function App() {
  console.log(snareArray)

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

  function activateNote(e) {
    if (melodyArray[e.target.getAttribute("row") - 1][e.target.id - 1].isActive === false) {
      melodyArray[e.target.getAttribute("row") - 1][e.target.id - 1].isActive = true
      melodyArray[e.target.getAttribute("row") - 1][e.target.id - 1].backgroundColor = "red" 
    }
    else {
      melodyArray[e.target.getAttribute("row") - 1][e.target.id - 1].isActive = false
      melodyArray[e.target.getAttribute("row") - 1][e.target.id - 1].backgroundColor = "white"
    }
  }


  //get transport moving
  let index = 0;
  const kick = new Tone.MembraneSynth().toDestination()
  const snare = new Tone.MetalSynth({
      frequency: 10,
      envelope: {
          attack: 0.0001,
          sustain: 0.01,
          decay: 1,
          release: 0.2
      },
      harmonicity: .15 ,
      modulationIndex: 64,
      resonance: 50,
      octaves: 10
    }).toDestination()

  const synths = [
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth()
  ]
  Tone.Transport.scheduleRepeat(repeat, "16n")

  //callback for note triggering
  function repeat() {
    let step = index % 16
    if (snareArray[step].isActive === true) {
      snare.triggerAttackRelease('C2', '8n')
    }
    if (kickArray[step].isActive === true) {
      kick.triggerAttackRelease('C4', '8n')
    }
    for (var i = 0; i < melodyArray.length; i++) {
      let row = melodyArray[i]
      let note = row[i].note
      let $synth = synths[i]
      if (row[step].isActive === true) {
        $synth.triggerAttackRelease(note, '8n').toDestination()
      }
    }
    index++
  }
  function startSequence() {
    Tone.start()
    Tone.Transport.start()
  }

  return (
    <div>
      <div>
        <h1>Sequencer!</h1>
      </div>
      <h2 key="drums">Drums</h2>
      <div key="snare" className="row">
        {snareArray.map((note) => (
          <input type="checkbox" text={note.note} onClick={activateSnare} key={note.id} className="box" id={note.id}>
          </input>
        ))}
      </div>
      <div key="kick" className="row">
        {kickArray.map((note) => (
          <input type="checkbox" text={note.note} onClick={activateKick} key={note.id + 8} className="box" id={note.id}>
          </input>
        ))}
      </div>
      <h2>Melody</h2>
      <div>
        {melodyArray.map((row, i) => (
          <div key={row[i]} className="row">
            {row.map(subdivision => (
              <input type="checkbox" text={subdivision.note} onClick={activateNote} key={subdivision.id} row={subdivision.row} className={`box ${subdivision.backgroundColor} `} id={subdivision.id}></input>
            )
            )}
          </div>
        )
        )}
      </div>
      <button key="start" className={"play"} onClick={startSequence}>startSequence</button>
    </div>

  )
}