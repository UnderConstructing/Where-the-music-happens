import React, { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import { useParams } from 'react-router-dom'




export default function HiHat() {
  const userInfo = useContext(AuthContext)
  console.log(userInfo)
  const {sequencerindex} = useParams()
  // console.log(`sequencer: ${sequencerindex}`)
  const hiHatsArray = userInfo.user.hihatArray[sequencerindex]
    function activateHiHat(event) {
        console.log(event.target)
        if (hiHatsArray[event.target.id - 1].isActive === false) {
          hiHatsArray[event.target.id - 1].isActive = true
        }
        else {
          hiHatsArray[event.target.id - 1].isActive = false
        }
        console.log(event.target)
      }
    return (
        <div key="hihat" className="row hi-hat">
        {hiHatsArray.map((note) => (
          <div className="parent">
            <input type="checkbox" defaultChecked={note.isActive}   text={note.note} onClick={activateHiHat} key={"hihat" + note.id} className={`box col${note.id} `} id={note.id}>
            </input>
            <label></label>
          </div>
        ))}
      </div>
    )
}