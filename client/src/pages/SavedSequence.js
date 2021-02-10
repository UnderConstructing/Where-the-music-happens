import React, { useState, useContext, useEffect, useRef } from 'react'
import kickArray from '../templates/kick.json';
// import hihatArray from '../templates/hihat.json'
import bassArray from '../templates/bass.json'
import * as Tone from 'tone';
import Chat from '../Chat'
import DrumDiv from '../DrumDiv'
import BassDiv from '../BassDiv';
import MelodyDiv from '../MelodyDiv';
import MelodyDivTwo from '../MelodyDivTwo'
import '../sequencer.scss'
import useInterval from '../useInterval'
import Grid from './Grid'
import ChatApp from '../ChatComponent'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as synth from '../synthSource'
import BrowserRouter, { Link, useParams, match} from 'react-router-dom'
// import Grid from './Grid'

import AuthContext from '../utils/Context/AuthContext'
import API from "../utils/API"
import { SequencerContextProvider, useSequencerContext } from '../utils/Context/SequencerContext'





export default function SavedSequence() {
  // const [sequencerIndex, setSequencerIndex] = useState(  useParams({sequencerIndex}))
  const {sequencerindex} = useParams()
  const userInfo = useContext(AuthContext)
  console.log(userInfo)

  const hihatArray = userInfo.user.receivedhihatArray[sequencerindex]
  const snareArray = userInfo.user.receivedsnareArray[sequencerindex]
  const kickArray = userInfo.user.receivedkickArray[sequencerindex]
  const openHhArray = userInfo.user.receivedopenHhArray[sequencerindex]
  const melodyArray = []
  melodyArray.push(
    userInfo.user.receivedmelodyRowOne[sequencerindex],
    userInfo.user.receivedmelodyRowTwo[sequencerindex],
    userInfo.user.receivedmelodyRowThree[sequencerindex],
    userInfo.user.receivedmelodyRowFour[sequencerindex],
    userInfo.user.receivedmelodyRowFive[sequencerindex],
    userInfo.user.receivedmelodyRowSix[sequencerindex],
    userInfo.user.receivedmelodyRowSeven[sequencerindex],
    userInfo.user.receivedmelodyRowEight[sequencerindex],
    userInfo.user.receivedmelodyRowNine[sequencerindex]
    )
    const melodyArrayTwo = []
    melodyArrayTwo.push(
      userInfo.user.receivedmelody2RowOne[sequencerindex],
      userInfo.user.receivedmelody2RowTwo[sequencerindex],
      userInfo.user.receivedmelody2RowThree[sequencerindex],
      userInfo.user.receivedmelody2RowFour[sequencerindex],
      userInfo.user.receivedmelody2RowFive[sequencerindex],
      userInfo.user.receivedmelody2RowSix[sequencerindex],
      userInfo.user.receivedmelody2RowSeven[sequencerindex],
      userInfo.user.receivedmelody2RowEight[sequencerindex],
      userInfo.user.receivedmelody2RowNine[sequencerindex]
    )
    const bassArray = []
  bassArray.push (
    userInfo.user.receivedbassRowOne[sequencerindex],
    userInfo.user.receivedbassRowTwo[sequencerindex],
    userInfo.user.receivedbassRowThree[sequencerindex],
    userInfo.user.receivedbassRowFour[sequencerindex],
    userInfo.user.receivedbassRowFive[sequencerindex],
    userInfo.user.receivedbassRowSix[sequencerindex],
    userInfo.user.receivedbassRowSeven[sequencerindex],
    userInfo.user.receivedbassRowEight[sequencerindex],
    userInfo.user.receivedbassRowNine[sequencerindex]
    )


  const [currentCol, setCurrentCol] = useState(1)
  const counter = () => {
    let count = ((currentCol + 1))
    let step = count % 32
    setCurrentCol(step)
  }
  

  function useKey(key, cb) {
    const callbackRef = useRef(cb)

    useEffect(() => {
      callbackRef.current = cb;
    })

    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event)
      }
    }
    useEffect(() => {
      document.addEventListener("keypress", handle)
      return () => document.removeEventListener("keypress", handle)
    }, [key])
  }

  function handleGsharp() {
    synth.playGsharp3()
  }
  function handleA() {
    synth.playA()
    synth.playDetA()
  }
  function handleS() {
    synth.playB()
  }
  function handleD() {
    synth.playC()
  }
  function handleF() {
    synth.playD()
  }
  function handleG() {
    synth.playE()
  }
  function handleH() {
    synth.playF()
  }
  function handleJ() {
    synth.playFsharp()
  }
  function handleK() {
    synth.playG()
  }
  function handleL() {
    synth.playGsharp()
  }
  function handleCol() {
    synth.playAA()
  }

  useKey("KeyQ", handleGsharp)
  useKey("KeyA", handleA)
  useKey("KeyS", handleS)
  useKey("KeyD", handleD)
  useKey("KeyF", handleF)
  useKey("KeyG", handleG)
  useKey("KeyH", handleH)
  useKey("KeyJ", handleJ)
  useKey("KeyK", handleK)
  useKey("KeyL", handleL)
  useKey("Semicolon", handleCol)



  const [visibility, setVisibility] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(100)
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
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } }),
    new Tone.Synth({ oscillator: { type: 'sine' } })
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
  let indexedArray = []


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
  
  function sendSequence() {
    
  }


  function saveSequence() {
    console.log(userInfo.user.username)
    Tone.Transport.stop()
    Tone.Transport.clear()
    Tone.Transport.dispose()
    let data = 
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
      }

    console.log(data)
    API.saveTone(data).then(res => toast("You have saved the sequence!"))
      .catch(err => {
        toast("Your sequence did not save sucessfully")
        console.error(err)
      })
  }
  async function startSequence(event) {
    event.preventDefault()
    Tone.start()
    Tone.Transport.start()
    // setVisibility(true)
    // setCurrentCol(1)

  };

  return (
    <div>
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
          <MelodyDiv visibility={visibility} columnIndex={currentCol} />
        </div>
        <div className="grid">
          <MelodyDivTwo visibility={visibility} columnIndex={currentCol} />
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
        <div>
        <button className="save-button" onClick={saveSequence}>Save!</button>
        <Grid />
        <ToastContainer />
        <ChatApp />
        </div>

      </div>
    </div>
  )
}
