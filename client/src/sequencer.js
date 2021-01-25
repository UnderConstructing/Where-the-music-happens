import kickArray from './kick.json';
import snareArray from './snare.json';
import * as Tone from 'tone';




export let playArray = [kickArray, snareArray]

Tone.Transport.scheduleRepeat(sequencer, "4n")
let index = 0

export function sequencer(time) {
  let step = index % 8

  if (kickArray[step].isActive === true) {
    kickDrum.triggerAttackRelease("C2", "16n")
  }


    console.log(step)
    index++
  }
