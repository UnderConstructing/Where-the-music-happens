import { Synth } from 'tone'

export const detA = new Synth({
  type: "sine",
  detune: 10
}).toDestination()
export function playDetA() {
  detA.triggerAttackRelease("A3", "16n")
}

export const a = new Synth().toMaster()
export function playA() {
  a.triggerAttackRelease("A3", "16n")
}

export const asharp = new Synth().toMaster()
export function playAsharp() {
  asharp.triggerAttackRelease("A#3", "16n")
}
export const b = new Synth().toMaster()
export function playB() {
  b.triggerAttackRelease("B3", "16n")
}
export const c = new Synth().toMaster()
export function playC() {
  c.triggerAttackRelease("C4", "16n")
}
export const csharp = new Synth().toMaster()
export function playCsharp() {
  csharp.triggerAttackRelease("C#4", "16n")
}
export const d = new Synth().toMaster()
export function playD() {
  d.triggerAttackRelease("D4", "16n")
}
export const dsharp = new Synth().toMaster()
export function playDsharp() {
  dsharp.triggerAttackRelease("D#4", "16n")
}
export const e = new Synth().toMaster()
export function playE() {
  e.triggerAttackRelease("E4", "16n")
}
export const f = new Synth().toMaster()
export function playF() {
  f.triggerAttackRelease("F4", "16n")
}
export const fsharp = new Synth().toMaster()
export function playFsharp() {
  fsharp.triggerAttackRelease("F#4", "16n")
}
export const g = new Synth().toMaster()
export function playG() {
  g.triggerAttackRelease("G4", "16n")
}

export const gsharp = new Synth().toMaster()
export function playGsharp() {
  gsharp.triggerAttackRelease("G#4", "16n")
}

export const A = new Synth().toMaster()
export function playAA() {
  A.triggerAttackRelease("A4", "16n")
}

export const lowGsharp = new Synth().toMaster()
export function playGsharp3() {
  lowGsharp.triggerAttackRelease("G#3", "16n")
}

