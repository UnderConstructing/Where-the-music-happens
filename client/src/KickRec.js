import React, { useEffect, useContext } from 'react'
import snareArray from './templates/snare.json'
import AuthContext from './utils/Context/AuthContext'
import BrowserRouter, {Link, useParams} from 'react-router-dom'
import { useSequencerContext, useSequencerContextUpdate } from './utils/Context/SequencerContext'

export default function KickRec() {
  const userInfo = useContext(AuthContext)
  const {sequencerindex} = useParams()
  const kickArrayRec = userInfo.user.receivedkickArray[sequencerindex]

    function activateKick(event) {
        if (kickArrayRec[event.target.id - 1].isActive === false) {
          kickArrayRec[event.target.id - 1].isActive = true
        }
        else {
          kickArrayRec[event.target.id - 1].isActive = false
        }
      }
    return (
        <div key="kick" className="row kick">
        {kickArrayRec.map((note) => (
          <div className="parent">
            <input type="checkbox" defaultChecked={note.isActive} text={note.note} onClick={activateKick} key={"kick" + note.id} className={`box col${note.id} `} id={note.id}>
            </input>
            <label></label>
          </div>
        ))}
      </div>
    )
}