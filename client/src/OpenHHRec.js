import React, { useEffect, useContext } from 'react'
import snareArray from './templates/snare.json'
import AuthContext from './utils/Context/AuthContext'
import BrowserRouter, {Link, useParams} from 'react-router-dom'
import { useSequencerContext, useSequencerContextUpdate } from './utils/Context/SequencerContext'

export default function OpenHhRec() {
  const userInfo = useContext(AuthContext)
  const {sequencerindex} = useParams()
  const openHhArray = userInfo.user.receivedopenHhArray[sequencerindex]

    function activateOpenhh(event) {
        if (openHhArray[event.target.id - 1].isActive === false) {
          openHhArray[event.target.id - 1].isActive = true
        }
        else {
          openHhArray[event.target.id - 1].isActive = false
        }
      }

    return (
        <div key="openhh" className="row openhh">
        {openHhArray.map((note) => (
          <div className="parent">
            <input type="checkbox" defaultChecked={note.isActive} text={note.note} onClick={activateOpenhh} key={"openhh" +note.id} className={`box col${note.id} `} id={note.id}>
            </input>
            <label></label>
          </div>
        ))}
      </div>
    )
}