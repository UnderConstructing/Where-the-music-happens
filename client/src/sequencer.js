import React, { useState, useContext } from 'react'
import './App.css'
import kickArray from './templates/kick.json';
import snareArray from './templates/snare.json';
import melodyArray from './templates/melody.json'
import * as Tone from 'tone';
import { PromiseProvider } from 'mongoose';
import Chat from './Chat'

import AuthContext from './utils/Context/AuthContext'

export default function Sequencer() {
const userInfo = useContext(AuthContext)
console.log(userInfo)
const synth = new Tone.PolySynth

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

const filter = new Tone.Filter(200, 'lowpass')
// const filter1 = new Tone.Filter(1000, 'highpass', -48)
// const filter2 = new Tone.Filter(1000, 'highpass', -48)
// const filter3 = new Tone.Filter(1000, 'highpass', -48)
// const filter4 = new Tone.Filter(1000, 'highpass', -48)
// const filter5 = new Tone.Filter(1000, 'highpass', -48)
// const filter6 = new Tone.Filter(1000, 'highpass', -48)
// const filter7 = new Tone.Filter(1000, 'highpass', -48)
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
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  }),
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  }),
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  }),
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  }),
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  }),
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  }), 
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  }),
  new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  })
]


synths.forEach(synth => synth.sync())
// synths.forEach(synth => {
//   synth.connect(filter)})
Tone.Transport.scheduleRepeat(repeat, "16n")
Tone.Transport.bpm.value = 80
//callback for note triggering
async function repeat(time) {
  Tone.setContext(new Tone.Context({ latencyHint: 0}))
  Tone.Transport.context.lookAhead = 1
  await Tone.start()
  let step = index % 16
  if (snareArray[step].isActive === true) {
    snare.triggerAttackRelease('C2', '8n', time).toDestination()
  }
  if (kickArray[step].isActive === true) {
    kick.triggerAttackRelease('C1', '8n', time).toDestination()
  }
  for (var i = 0; i < melodyArray.length; i++) {
    let row = melodyArray[i]
    let note = row[i].note
    let $synth = synths[i]
    if (row[step].isActive === true) {
      $synth.triggerAttackRelease(note, '8n', time).toDestination()
    }
  }
  index++
}
function startSequence() {
  Tone.start()
  Tone.Transport.start()

}

//try to connect synth to filter
function testSynth() {
  const tester = new Tone.MonoSynth({
    frequency : 'C4',
    detune : 0 ,
    oscillator : {
    type : 'square'
    } ,
    filter : {
    frequency: 100,
    type : 'lowpass' ,
    rolloff : -48
    } ,
    envelope : {
    attack : 0.1 ,
    decay : 0.1 ,
    sustain : 0.9 ,
    release : 1
    } ,
    filterEnvelope : {
    attack : .1 ,
    decay : .5,
    sustain : 1 ,
    release : 2 ,
    baseFrequency : 100 ,
    octaves : 2 ,
    exponent : 2
    }
  })

  tester.triggerAttackRelease('C4', '2n').toDestination()
}

return (
  <div className="center">
  <div className="main">
    {/* <div className="sub"> */}
      <h1 className="title">Sequencer!</h1>
    {/* </div> */}
    <h2 key="drums">Drums</h2>
    <div key="snare" className="row snare">
      {snareArray.map((note) => (
        <div className="parent">
        <input type="checkbox" text={note.note} onClick={activateSnare} key={note.id+16} className="box" id={note.id}>
        </input>
        <label></label>
        </div>
      ))}
    </div>
    <div key="kick" className="row snare">
      {kickArray.map((note) => (
        <div className="parent">
        <input type="checkbox" text={note.note} onClick={activateKick} key={note.id + 8} className="box" id={note.id}>
        </input>
        <label></label>
        </div>
      ))}
    </div>
    {/* <h2>Melody</h2> */}
    <div key="melody" className="melody">
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
    <a key="start" className={"button play"} onClick={startSequence}><p></p></a>
      <Chat />
  </div>
  </div>
)}