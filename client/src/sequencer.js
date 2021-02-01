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


import AuthContext from './utils/Context/AuthContext'
import axios from 'axios';

export default function Sequencer() {
  const [playing, setPlaying] = useState(false)
  const [bpm, setBpm] = useState(100)
  const userInfo = useContext(AuthContext)




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
    console.log(melodyArray)
    // console.log(melodyArray[e.target.getAttribute("row") - 1][(parseInt(e.target.id)/parseInt(e.target.getAttribute('row'))) - 1].id)
  }

  function activateBassNote(e) {
    if (bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
      bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
    }
    else {
      bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
    }
    console.log(bassArray)
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
  // synths.forEach(synth => synth.sync())
  // synths.forEach(synth => {
  //   synth.connect(filter)})

  //callback for note triggering
  function repeat(time) {
    // Tone.setContext(new Tone.Context({ latencyHint: 1}))
    // Tone.Transport.context.lookAhead = 1
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
    // var isPlaying = event.target.getAttribute('data-playing')
    // if (!isPlaying) {
    //   await setPlaying(true) 
    //   Tone.Transport.start()
    //   console.log(playing)
    // } 
    // else {
    //   setPlaying(false)
    //   console.log(playing)
    // }

    // useEffect(() => {
    //   Tone.Transport.start()
    // }


  };

  //try to connect synth to filter
  function testSynth() {
    const tester = new Tone.MonoSynth({
      frequency: 'C4',
      detune: 0,
      oscillator: {
        type: 'square'
      },
      filter: {
        frequency: 100,
        type: 'lowpass',
        rolloff: -48
      },
      envelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.9,
        release: 1
      },
      filterEnvelope: {
        attack: .1,
        decay: .5,
        sustain: 1,
        release: 2,
        baseFrequency: 100,
        octaves: 2,
        exponent: 2
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
              <input type="checkbox" text={note.note} onClick={activateSnare} key={note.id + 16} className="box" id={note.id}>
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
        <hr></hr>
        {/* <h2>Melody</h2> */}
        <div key="melody" className="melody">
          {melodyArray.map((row, i) => (
            <div key={row + row[i].note} id={row[i].note} className="row">
              {row.map(subdivision => (
                <div className='parent'>
                  <input type="checkbox" text={subdivision.note} onChange={activateNote} key={`${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box ${subdivision.backgroundColor} `} id={subdivision.id}></input>
                  <label></label>
                </div>
              )
              )}
            </div>
          )
          )}
        </div>
        <hr></hr>
        <div key="bass" >
          {bassArray.map((row, i) => (
            <div key={row + row[i].note} id={row[i].note} className="row">
              {row.map(subdivision => (
                <div className='parent'>
                  <input type="checkbox" text={subdivision.note} onChange={activateBassNote} key={`${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box ${subdivision.backgroundColor} `} id={subdivision.id}></input>
                  <label></label>
                </div>
              )
              )}
            </div>
          )
          )}
        </div>
        <button data-playing={playing} onClick={startSequence}>Test</button>
        {/* <a key="start" className={"button play"} onClick={startSequence}><p></p></a> */}
        {/* <Chat /> */}
        <div>
          <h1>home</h1>
          <Grid />
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