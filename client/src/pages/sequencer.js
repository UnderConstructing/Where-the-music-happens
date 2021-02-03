import React, { useState, useContext, useEffect } from 'react'
import kickArray from '../templates/kick.json';
import snareArray from '../templates/snare.json';
import melodyArray from '../templates/melody.json';
import hihatArray from '../templates/hihat.json'
import openHhArray from '../templates/openhh.json'
import bassArray from '../templates/bass.json'
import * as Tone from 'tone';
import Chat from '../Chat'
import DrumDiv from '../DrumDiv'
import BassDiv from '../BassDiv';
import MelodyDiv from '../MelodyDiv';
import '../sequencer.scss'
// import Grid from './Grid'

import AuthContext from '../utils/Context/AuthContext'
import API from "../utils/API"



export default function Sequencer() {
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(100)
  const userInfo = useContext(AuthContext)
  console.log(userInfo.user)
  function relocate() {
    window.location.href = '/profile'
  }
  function disappear() {

  }
  //INSTRUMENT CONSTRUCTORS!
  const kick = new Tone.MembraneSynth();
  kick.toDestination()
  const snare = new Tone.NoiseSynth({
    noise: {
      type: "brown"
    },
    envelope: {
      attack: 0,
      decay: 0.05,
      sustain: 0.008
    }
  })
  const openhh = new Tone.MembraneSynth()
  openhh.toDestination()
  snare.toDestination()
  const hihat = new Tone.MetalSynth({
    frequency: 200,
    envelope: {
      attack: 0.008,
      decay: 0.052,
      release: 0.002
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 3000,
    octaves: 1.5
  });
  kick.toDestination()

  const synths = [
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

  const bassSynths = [
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } }),
    new Tone.Synth({ oscillator: { type: 'fatsquare' } })
  ]
  let colArray = []

  function getCols() {
    for (let i = 0; i < 32; i++) {
      let indexedArray = []
      for (let j = 0; j < melodyArray.length; j++) {
        colArray.push(melodyArray[j][i])
      }
    }
    var chunks = [], m = 0, n = colArray.length;
    while (m < n) {
      chunks.push(colArray.slice(m, m += 9));
    }
    colArray = chunks
    console.log(colArray)
  }

  getCols()
  // melodyarr[i]

  useEffect(() => {
    Tone.Transport.scheduleRepeat(repeat, "16n")
    Tone.Transport.bpm.value = [bpm]
  }, [])

  //callback for note triggering
  let index = 0;
  function repeat(time) {
    let notesPlayed = [];
    let step = index % 32
    if (hihatArray[step].isActive === true) {
      hihat.triggerAttackRelease('C2', '16n', time).toDestination()
    }
    if (openHhArray[step].isActive === true) {
      openhh.triggerAttackRelease('C2', '16n', time).toDestination()
    }
    if (snareArray[step].isActive === true) {
      snare.triggerAttackRelease('16n', time).toDestination()
    }
    if (kickArray[step].isActive === true) {
      kick.triggerAttackRelease('C1', '16n', time).toDestination()
    }

    for (var i = 0; i < melodyArray.length; i++) {
      let row = melodyArray[i]
      let note = row[i].note
      let $synth = synths[i]
      if (row[step].isActive === true) {
        $synth.triggerAttackRelease(note, '16n', time).toDestination()

      }
    }
    for (var j = 0; j < bassArray.length; j++) {
      let row = bassArray[j]
      let note = row[j].note
      let $synth = bassSynths[j]
      if (row[step].isActive === true) {
        $synth.triggerAttackRelease(note, '16n', time).toDestination()
      }
    }

    index++
  }


  function saveSequence() {
    console.log(userInfo.user.username)
    Tone.Transport.stop()
    Tone.Transport.clear()
    let data = [
      {
        username: userInfo.user.username,
        hihatArray: hihatArray,
        openHhArray: openHhArray,
        snareArray: snareArray,
        kickArray: kickArray,
        melodyRowOne: melodyArray[0],
        melodyRowTwo: melodyArray[1],
        melodyRowThree: melodyArray[2],
        melodyRowFour: melodyArray[3],
        melodyRowFive: melodyArray[4],
        melodyRowSix: melodyArray[5],
        melodyRowSeven: melodyArray[6],
        melodyRowEight: melodyArray[7],
        melodyRowNine: melodyArray[8],
        bassRowOne: bassArray[0],
        bassRowTwo: bassArray[1],
        bassRowThree: bassArray[2],
        bassRowFour: bassArray[3],
        bassRowFive: bassArray[4],
        bassRowSix: bassArray[5],
        bassRowSeven: bassArray[6],
        bassRowEight: bassArray[7],
        bassRowNine: bassArray[8]
      }]
    console.log(data)
    API.saveTone(data).then(res => alert("You have saved the sequence!"))
      .catch(err => console.error(err))
  }
  async function startSequence(event) {
    event.preventDefault()
    Tone.start()
    Tone.Transport.start()
  };

  return (
    <div className="center">
      {/* <Chat /> */}
      <h1 className="title">Sequencer!</h1>
      <button onClick={relocate}>Profile</button>
      <h2 key="drums">Drums</h2>
      <div className="main">
        {/* <div className="sub"> */}
        {/* </div> */}
        <DrumDiv />
        {/* <h2>Melody</h2> */}
        <div className="grid">
          <MelodyDiv />
        </div>
        <div className="grid">
          <BassDiv />
        </div>
        <button data-playing={playing} onClick={startSequence}>Test</button>
        <div>
          <input type="range"
            min="40"
            max='200'
            value={bpm}
            onChange={({ target: { value: radius } }) =>
              setBpm(radius)}></input>
        </div>
        <button className="save-button" onClick={saveSequence}>Save!</button>
        <button onClick={getCols}>Get Cols</button>
      </div>
    </div>
  )
}