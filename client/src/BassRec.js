import React, { useContext } from 'react'
import AuthContext from './utils/Context/AuthContext'
import { useParams} from 'react-router-dom'


export default function BassRec(props) {
  const userInfo = useContext(AuthContext)
  console.log(userInfo)
  const {sequencerindex} = useParams()
  // console.log(`sequencer: ${sequencerindex}`)
  const bassArray = []
  bassArray.push (
    userInfo.user.receivedbassRowOne[sequencerindex],
    userInfo.user.receivedbassRowTwo[sequencerindex],
    userInfo.user.receivedbassRowThree[sequencerindex],
    userInfo.user.receivedbassRowFour[sequencerindex],
    userInfo.user.receivedbassRowFive[sequencerindex],
    userInfo.user.receivedbassRowSix[sequencerindex],
    userInfo.user.receivedbassRowSeven[sequencerindex],
    userInfo.user.receivedbassRowEight[sequencerindex],
    userInfo.user.receivedbassRowNine[sequencerindex]
    )
    function activateBassNote(e) {
        if (bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive === false) {
            bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = true
        }
        else {
            bassArray[e.target.getAttribute("row") - 1][(e.target.id - 1)].isActive = false
        }
    }
    return (
        <div key="bass" >
            {bassArray.map((row, i) => (
                <div key={row + row[i].note} id={row[i].note} className="row">
                    {row.map(subdivision => (
                        <div className='parent'>
                            <input type="checkbox" defaultChecked={subdivision.isActive} text={subdivision.note} onChange={activateBassNote} key={`bass${subdivision.row}${subdivision.id}`} row={subdivision.row} className={`box col${subdivision.id}`} id={subdivision.id}></input>
                            <label></label>
                        </div>
                    )
                    )}
                </div>
            )
            )}
        </div>

    )
}