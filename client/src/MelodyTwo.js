import React, { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import { useParams } from 'react-router-dom'

export default function Melody() {
  const userInfo = useContext(AuthContext)
  console.log(userInfo)
  const { sequencerindex } = useParams()
  // console.log(`sequencer: ${sequencerindex}`)
  const melodyArrayTwo = []
  melodyArrayTwo.push(
    userInfo.user.melody2RowOne[sequencerindex],
    userInfo.user.melody2RowTwo[sequencerindex],
    userInfo.user.melody2RowThree[sequencerindex],
    userInfo.user.melody2RowFour[sequencerindex],
    userInfo.user.melody2RowFive[sequencerindex],
    userInfo.user.melody2RowSix[sequencerindex],
    userInfo.user.melody2RowSeven[sequencerindex],
    userInfo.user.melody2RowEight[sequencerindex],
    userInfo.user.melody2RowNine[sequencerindex]
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