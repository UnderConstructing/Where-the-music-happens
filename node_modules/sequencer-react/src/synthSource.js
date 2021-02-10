import { Synth } from 'tone'

export const detA = new Synth({
  type: "sine",
  detune: 10
}).toDestination()
export function playDetA() {
  detA.triggerAttackRelease("A3", "16n")
}

export const a = new Synth().toDestination()
export function playA() {
  a.triggerAttackRelease("C3", "16n")
}

export const asharp = new Synth().toDestination()
export function playAsharp() {
  asharp.triggerAttackRelease("D3", "16n")
}
export const b = new Synth().toDestination()
export function playB() {
  b.triggerAttackRelease("E3", "16n")
}
export const c = new Synth().toDestination()
export function playC() {
  c.triggerAttackRelease("F3", "16n")
}
export const csharp = new Synth().toDestination()
export function playCsharp() {
  csharp.triggerAttackRelease("G3", "16n")
}
export const d = new Synth().toDestination()
export function playD() {
  d.triggerAttackRelease("A3", "16n")
}
export const dsharp = new Synth().toDestination()
export function playDsharp() {
  dsharp.triggerAttackRelease("A#3", "16n")
}
export const e = new Synth().toDestination()
export function playE() {
  e.triggerAttackRelease("B3", "16n")
}
export const f = new Synth().toDestination()
export function playF() {
  f.triggerAttackRelease("C4", "16n")
}
export const fsharp = new Synth().toDestination()
export function playFsharp() {
  fsharp.triggerAttackRelease("D4", "16n")
}
export const g = new Synth().toDestination()
export function playG() {
  g.triggerAttackRelease("E4", "16n")
}

export const gsharp = new Synth().toDestination()
export function playGsharp() {
  gsharp.triggerAttackRelease("F4", "16n")
}

export const A = new Synth().toDestination()
export function playAA() {
  A.triggerAttackRelease("G4", "16n")
}

export const lowGsharp = new Synth().toDestination()
export function playGsharp3() {
  lowGsharp.triggerAttackRelease("A4", "16n")
}

