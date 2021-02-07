import React, { useState, useContext, useEffect } from 'react'
import kickArray from '../templates/kick.json';
import snareArray from '../templates/snare.json';
import melodyArray from '../templates/melody.json';
import melodyArrayTwo from '../templates/melodytwo.json'
import hihatArray from '../templates/hihat.json'
import openHhArray from '../templates/openhh.json'
import bassArray from '../templates/bass.json'
import * as Tone from 'tone';
import Chat from '../Chat'
import DrumDiv from '../DrumDiv'
import BassDiv from '../BassDiv';
import MelodyDiv from '../MelodyDiv';
import MelodyDivTwo from   '../MelodyDivTwo'
import '../sequencer.scss'
import useInterval from '../useInterval'
import Grid from './Grid'
import ChatApp from '../ChatComponent'
// import Grid from './Grid'

import AuthContext from '../utils/Context/AuthContext'
import API from "../utils/API"
import cookieParser from 'cookie-parser';




export default function Sequencer() {
  const [currentCol, setCurrentCol] = useState(1)
  const counter = () => {
    let count = ((currentCol+1))
    let step = count % 32
    setCurrentCol(step)
  }
  

  // useInterval(() => {
  //   counter()
  // }, 600)


  const [visibility, setVisibility] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(100)
  const userInfo = useContext(AuthContext)
  function relocate() {
    window.location.href = `/profile/${userInfo.user.username}`;
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

  const trebleSynths = [
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}}),
    new Tone.Synth({oscillator: {type: 'sine'}})
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
  let drumsArray = []
  let indexedArray =[]
  
  
  // melodyarr[i]

  useEffect(() => {
    Tone.Transport.scheduleRepeat(repeat, "16n")
    Tone.Transport.bpm.value = [bpm]
    console.log('effect used')
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
    for (var i = 0; i < melodyArrayTwo.length; i++) {
      let row = melodyArrayTwo[i]
      let note = row[i].note
      let $synth = trebleSynths[i]
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

console.log(melodyArrayTwo[8][0].note)
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
        melody2RowOne: melodyArrayTwo[0],
        melody2RowTwo: melodyArrayTwo[1],
        melody2RowThree: melodyArrayTwo[2],
        melody2RowFour: melodyArrayTwo[3],
        melody2RowFive: melodyArrayTwo[4],
        melody2RowSix: melodyArrayTwo[5],
        melody2RowSeven: melodyArrayTwo[6],
        melody2RowEight: melodyArrayTwo[7],
        melody2RowNine: melodyArrayTwo[8],
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

    API.saveTone(data).then(res => alert("You have saved the sequence!"))
      .catch(err => console.error(err))
  }
  async function startSequence(event) {
    event.preventDefault()
    Tone.start()
    Tone.Transport.start()
    // setVisibility(true)
    // setCurrentCol(1)

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
          <MelodyDiv visibility={visibility}columnIndex={currentCol}/>
        </div>
        <div className="grid">
          <MelodyDivTwo visibility={visibility} columnIndex={currentCol}/>
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
        <Grid />
        <ChatApp />
      </div>
    </div>
  )
}