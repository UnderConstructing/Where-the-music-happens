import React from 'react'
import './App.css'
import kickArray from './kick.json';
import snareArray from './snare.json';
import melodyArray from './melody.json'
import * as Tone from 'tone';



export default function Sequencer() {
console.log(snareArray)
const gainNode = new Tone.Gain(0).toDestination()
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
  if (melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
    melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
  }
  else {
    melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
  }
  // console.log(melodyArray[e.target.getAttribute("row") - 1][(parseInt(e.target.id)/parseInt(e.target.getAttribute('row'))) - 1].id)
}

const filter = new Tone.Filter(1000, 'highpass', -48)
const filter1 = new Tone.Filter(1000, 'highpass', -48)
const filter2 = new Tone.Filter(1000, 'highpass', -48)
const filter3 = new Tone.Filter(1000, 'highpass', -48)
const filter4 = new Tone.Filter(1000, 'highpass', -48)
const filter5 = new Tone.Filter(1000, 'highpass', -48)
const filter6 = new Tone.Filter(1000, 'highpass', -48)
const filter7 = new Tone.Filter(1000, 'highpass', -48)
//get transport moving
let index = 0;
let reverb = new Tone.JCReverb({
  roomSize:.7
})
const kick = new Tone.MembraneSynth({
  pitchDecay: 2,
  octaves: 2,
  oscillator: {type: 'sine'},
  envelope: {
    attack: 0
  }
}).sync()
kick.connect(reverb)
const snare = new Tone.MetalSynth({
    frequency: 1500,
    envelope: {
        attack: 0,
        sustain: 0.01,
        decay: .8,
        release: 0.2
    },
    harmonicity: 100,
    modulationIndex: 24,
    resonance: 4000,
    octaves: 1.5
  }).sync()

  snare.connect(reverb)

const synths = [
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter),
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter1),
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter2),
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter3),
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter4),
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter5), 
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter6),
  new Tone.Synth({
    oscillator: {type: "square"},
    envelope: {
      attack: 0.001,
      sustain: .001,
      decay: 1,
      release: 2
    }
  }).connect(filter7)
]


synths.forEach(synth => synth.sync())
// synths.forEach(synth => {
//   synth.connect(filter)})
Tone.Transport.scheduleRepeat(repeat, "16n")
Tone.Transport.bpm.value = 80

//callback for note triggering
function repeat() {
  let step = index % 16
  if (snareArray[step].isActive === true) {
    snare.triggerAttackRelease('C2', '8n').toDestination()
  }
  if (kickArray[step].isActive === true) {
    kick.triggerAttackRelease('C1', '8n').toDestination()
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
  <div className="main">
    <div className="sub">
      <h1 className="title">Sequencer!</h1>
    </div>
    <h2 key="drums">Drums</h2>
    <div key="snare" className="row">
      {snareArray.map((note) => (
        <div className="parent">
        <input type="checkbox" text={note.note} onClick={activateSnare} key={note.id+16} className="box" id={note.id}>
        </input>
        <label></label>
        </div>
      ))}
    </div>
    <div key="kick" className="row">
      {kickArray.map((note) => (
        <div className="parent">
        <input type="checkbox" text={note.note} onClick={activateKick} key={note.id + 8} className="box" id={note.id}>
        </input>
        <label></label>
        </div>
      ))}
    </div>
    <h2>Melody</h2>
    <div>
      {melodyArray.map((row, i) => (
        <div id={row[i].note} className="row">
          {row.map(subdivision => (
            <div className='parent'>
            <input type="checkbox" text={subdivision.note} onChange={activateNote} key={`${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box ${subdivision.backgroundColor} `} id={subdivision.id}></input>
            <label for={subdivision.id}></label>
            </div>
            )
          )}
        </div>
      )
      )}
    </div>
    <button key="start" className={"play"} onClick={startSequence}>startSequence</button>
  </div>
)}