import React, { useEffect, useContext } from 'react'
import snareArray from './templates/snare.json'
import AuthContext from './utils/Context/AuthContext'
import BrowserRouter, {Link, useParams} from 'react-router-dom'
import { useSequencerContext, useSequencerContextUpdate } from './utils/Context/SequencerContext'

export default function Snare() {
  const userInfo = useContext(AuthContext)
  console.log(userInfo)
  const {sequencerindex} = useParams()
  // console.log(`sequencer: ${sequencerindex}`)
  const snaresArray = userInfo.user.snareArray[sequencerindex]
  console.log(snaresArray)

  
    function activateSnare(event) {
        console.log("id= " + event.target.id)
        if (snaresArray[event.target.id - 1].isActive === false) {
          snaresArray[event.target.id - 1].isActive = true
        }
        else {
          snaresArray[event.target.id - 1].isActive = false
        }
        console.log(`test is active: ${snaresArray[event.target.id - 1].isActive}`)
      }
    return(

    <div key="snare" className="row snare">
    {snaresArray.map((note) => (
      <div className="parent">
        <input type="checkbox" defaultChecked={note.isActive} text={note.note} onClick={activateSnare} key={"snare" + note.id} className={`box col${note.id} `} id={note.id}>
        </input>
        <label></label>
      </div>
    ))}
  </div>
  )
}