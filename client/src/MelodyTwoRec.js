import React, { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import { useParams } from 'react-router-dom'

export default function MelodyTwoRec() {
  const userInfo = useContext(AuthContext)
  console.log(userInfo)
  const { sequencerindex } = useParams()
  // console.log(`sequencer: ${sequencerindex}`)
  const melodyArrayTwo = []
  melodyArrayTwo.push(
    userInfo.user.receivedmelody2RowOne[sequencerindex],
    userInfo.user.receivedmelody2RowTwo[sequencerindex],
    userInfo.user.receivedmelody2RowThree[sequencerindex],
    userInfo.user.receivedmelody2RowFour[sequencerindex],
    userInfo.user.receivedmelody2RowFive[sequencerindex],
    userInfo.user.receivedmelody2RowSix[sequencerindex],
    userInfo.user.receivedmelody2RowSeven[sequencerindex],
    userInfo.user.receivedmelody2RowEight[sequencerindex],
    userInfo.user.receivedmelody2RowNine[sequencerindex]
  )
  function activateNote(e) {
    if (melodyArrayTwo[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
      melodyArrayTwo[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
    }
    else {
      melodyArrayTwo[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
    }
  }

  return (
    <div key="melodytwo" className="melody2">
      {melodyArrayTwo.map((row, i) => (
        <div key={row + row[i].note} id={row[i].note} className="row">
          {row.map(subdivision => (
            <div key={`${subdivision.id} key`} className='parent'>
              <input type="checkbox" defaultChecked={subdivision.isActive} text={subdivision.note} onChange={activateNote} key={`Melody${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box col${subdivision.id} `} id={subdivision.id}></input>
              <label key={`${subdivision.id}label`}></label>
              <span key={`${subdivision.id}span`}></span>
            </div>
          )
          )}
        </div>
      )
      )}
    </div>
  )
}