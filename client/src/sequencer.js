import React, { useState, useContext, useEffect } from 'react'
import './App.css'
import kickArray from './templates/kick.json';
import snareArray from './templates/snare.json';
import melodyArray from './templates/melody.json';
import bassArray from './templates/bass.json'
import * as Tone from 'tone';
import { PromiseProvider } from 'mongoose';
import Chat from './Chat'
import Grid from './Grid'
import Snare from './SnareSequence'
import Kick from './Kick'
import Melody from './Melody'

import AuthContext from './utils/Context/AuthContext'
import axios from 'axios';
import Bass from './Bass'

export default function Sequencer() {
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(100)
  const userInfo = useContext(AuthContext)

  //INSTRUMENT CONSTRUCTORS!
  const kick = new Tone.MembraneSynth();
  kick.toDestination()
  const snare = new Tone.MetalSynth();
  snare.toDestination()

  const synths = [
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
    new Tone.Synth({ oscillator: { type: 'fatsquare' } })
  ]

  useEffect(() => {
    Tone.Transport.scheduleRepeat(repeat, "16n")
    Tone.Transport.bpm.value = [bpm]
  }, [])
  
  //callback for note triggering
  let index = 0;
  function repeat(time) {
    let notesPlayed = [];
    let step = index % 16
    if (snareArray[step].isActive === true) {
      snare.triggerAttackRelease('C2', '16n', time).toDestination()
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
    Tone.Transport.stop()
    let saveArray = []
    saveArray.push(kickArray, snareArray, melodyArray, bassArray)
    console.log(saveArray)
    axios({
      method: "POST",
      data: {
        sequences: saveArray,
        username: AuthContext.username
      },
      withCredentials: true,
      url: 'http://localhost:4000/api/save/'
    }).then(res => alert("You have saved the sequence!"))
  }
  async function startSequence(event) {
    event.preventDefault()
    Tone.start()
    Tone.Transport.start()
  };

  return (
    <div className="center">
      <div className="main">
        {/* <div className="sub"> */}
        <h1 className="title">Sequencer!</h1>
        {/* </div> */}
        <h2 key="drums">Drums</h2>
          <Kick />
          <Snare />

        <hr></hr>
        {/* <h2>Melody</h2> */}
          <Melody />
        <hr></hr>
          <Bass />
        <button data-playing={playing} onClick={startSequence}>Test</button>
        <div>
          <input type="range"
            min="40"
            max='200'
            value={bpm}
            onChange={({ target: { value: radius } }) =>
              setBpm(radius)}></input>
        </div>
        <button onClick={saveSequence}>Save!</button>
      </div>
    </div>
  )
}