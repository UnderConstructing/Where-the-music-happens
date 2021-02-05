import React, { useState } from 'react'
import * as Tone from 'tone'


function makeGrid() {
  const theGrid = []
  for (var i = 0; i < 8; i++) {
    let column = [
      { note: "A4", isActive: false, type: "drum" },
      { note: "A4", isActive: false, type: "drum" },
      { note: "A4", isActive: false, type: "drum" },
      { note: "A4", isActive: false, type: "drum" },
      { note: "C4", isActive: false, type: "melody" },
      { note: "D4", isActive: false, type: "melody" },
      { note: "E4", isActive: false, type: "melody" },
      { note: "F4", isActive: false, type: "melody" },
      { note: "G4", isActive: false, type: "melody" },
      { note: "A4", isActive: false, type: "melody" },
      { note: "B4", isActive: false, type: "melody" },
      { note: "C5", isActive: false, type: "melody" },
      { note: "C2", isActive: false, type: "bass" },
      { note: "D2", isActive: false, type: "bass" },
      { note: "E2", isActive: false, type: "bass" },
      { note: "F2", isActive: false, type: "bass" },
      { note: "G2", isActive: false, type: "bass" },
      { note: "A2", isActive: false, type: "bass" },
      { note: "B2", isActive: false, type: "bass" },
      { note: "C3", isActive: false, type: "bass" }
    ]
    theGrid.push(column)

  }
  return theGrid
}

export default function Idea() {
  const [grid, setGrid] = useState(makeGrid())

  const [isPlaying, setIsPlaying] = useState(false)

  const [currentColumn, setCurrentColumn] = useState(null)

  const synth = new Tone.PolySynth().toDestination()

  function handleNote(col, theNote) {
    let newGrid = grid.map((col, iCol) => {
      col.map((note, iNote) => {
        let copiedNote = note
        if (iCol === col && iNote === theNote) {
          copiedNote.isActive = !note.isActive
        }
        return copiedNote
      })
    })
    setGrid(newGrid)
  }

  const Play = async () => {
    let sequence = []
    grid.map((col) => {
      let colNotes = []
      col.map(playing => {
        playing.isActive && colNotes.push(playing.note)
      })
      sequence.push(colNotes)
    })
    await Tone.start()

    const seq = new Tone.Sequence((time, col) => {
      setCurrentColumn(col)
    },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      "16n"
    )


    if (isPlaying) {
      await Tone.Transport.stop()
      await seq.stop()
      await seq.clear()
      await seq.dispose()

      return
    }

    setIsPlaying(true)

    await seq.start()
    await Tone.Transport.start()
  }
  return (
    <>
      <div className="sequencer-wrapper">
        {grid.map((column, columnIndex) => (
        <div className="reRow">
            {column.map(({ note, isActive, type }, noteIndex) => (
              <div className="parent">
              <input
                type="checkbox"
                note={note}
                isActive={isActive}
                instrument={type}
                onClick={() => handleNote(columnIndex, noteIndex)}
                key={note + columnIndex} />
                <label></label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="play-button" onClick={() => Play()}>
        {isPlaying ? "Stop" : "Play"}
      </button>
    </>
  );

}