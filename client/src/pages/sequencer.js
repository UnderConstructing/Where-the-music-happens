import React, { useState, useContext, useEffect } from 'react'
import kickArray from '../templates/kick.json';
import snareArray from '../templates/snare.json';
import melodyArray from '../templates/melody.json';
import bassArray from '../templates/bass.json'
import * as Tone from 'tone';
import Chat from '../Chat'
import Kick from '../Kick'
import Snare from '../SnareSequence'
import Melody from '../Melody'
import Bass from '../Bass'
import axios from 'axios'
// import Grid from './Grid'

import AuthContext from '../utils/Context/AuthContext'
import API from "../utils/API"

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
    console.log(userInfo.user.username)
    Tone.Transport.stop()
    let data = {    
      data: {    
      username: userInfo.user.username,
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
    }}
    console.log(data)
    axios.post({
      url: 'http://localhost:4000/api/save',
      data: data,
      withCredentials: true
    }).then(res => alert("You have saved the sequence!"))
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