import React, { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import { useParams } from 'react-router-dom'

export default function HiHatRec() {
  const userInfo = useContext(AuthContext)
  console.log(userInfo)
  const {sequencerindex} = useParams()
  // console.log(`sequencer: ${sequencerindex}`)
  const hiHatArray = userInfo.user.receivedhihatArray[sequencerindex]
  console.log(hiHatArray)
    function activateHiHat(event) {
        console.log(event.target)
        if (hiHatArray[event.target.id - 1].isActive === false) {
          hiHatArray[event.target.id - 1].isActive = true
        }
        else {
          hiHatArray[event.target.id - 1].isActive = false
        }
        console.log(event.target)
      }
    return (
        <div key="hihat" className="row hi-hat">
        {hiHatArray.map((note) => (
          <div className="parent">
            <input type="checkbox" defaultChecked={note.isActive} text={note.note} onClick={activateHiHat} key={"hihat" + note.id} className={`box col${note.id} `} id={note.id}>
            </input>
            <label></label>
          </div>
        ))}
      </div>
    )
}