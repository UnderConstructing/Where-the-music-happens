import React, { useEffect, useContext } from 'react'
import snareArray from './templates/snare.json'
import AuthContext from './utils/Context/AuthContext'
import BrowserRouter, {Link, useParams} from 'react-router-dom'
import { useSequencerContext, useSequencerContextUpdate } from './utils/Context/SequencerContext'


export default function Melody(props) {
  const userInfo = useContext(AuthContext)
  console.log(userInfo)
  const {sequencerindex} = useParams()
  // console.log(`sequencer: ${sequencerindex}`)
  const melodyArray = []
  melodyArray.push (
    userInfo.user.melodyRowOne[sequencerindex],
    userInfo.user.melodyRowTwo[sequencerindex],
    userInfo.user.melodyRowThree[sequencerindex],
    userInfo.user.melodyRowFour[sequencerindex],
    userInfo.user.melodyRowFive[sequencerindex],
    userInfo.user.melodyRowSix[sequencerindex],
    userInfo.user.melodyRowSeven[sequencerindex],
    userInfo.user.melodyRowEight[sequencerindex],
    userInfo.user.melodyRowNine[sequencerindex]
    )
    console.log(melodyArray)

    function activateNote(e) {
        if (melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
          melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
        }
        else {
          melodyArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
        }
    }
    return (
        <div key="melody" className="melody">
        {melodyArray.map((row, i) => (
          <div key={row + row[i].note} id={row[i].note} className="row">
            {row.map(subdivision => (
              <div key={`key${subdivision.id}`} col={subdivision.id}id={subdivision.id} className="parent">
                <input type="checkbox" defaultChecked={subdivision.isActive} text={subdivision.note} onChange={activateNote} key={`Melody${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box col${subdivision.id}`} id={subdivision.id}></input>
                <label></label>
                <span columnIndex={props.columnIndex} className={`${!props.visibility ? "invisible" : ""} ${subdivision.id - 1 === props.columnIndex ? "active": ""}`}></span>
              </div>
            )
            )}
          </div>
        )
        )}
      </div>
    )
}