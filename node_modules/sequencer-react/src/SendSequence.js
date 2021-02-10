// import React, { useState, useEffect, useContext} from 'react'
// import API from './utils/API'
// import AuthContext from './utils/Context/AuthContext'

// export default function SendSequenceComponent() {
//     const userInfo = useContext(AuthContext)
//     const [sequence, setSequence] = useState([])
//     const [user, setUser] = useState(userInfo.user.username)
//     function sendSequence(data){
//         if (userInfo === null || undefined) {
//             return
//         }
//         else {
//         data = {
//                     username: user,
//                     author: userInfo.user.author,
//                     hihatArray: hihatArray,
//                     openHhArray: openHhArray,
//                     snareArray: snareArray,
//                     kickArray: kickArray,
//                     melodyRowOne: melodyArray[0],
//                     melodyRowTwo: melodyArray[1],
//                     melodyRowThree: melodyArray[2],
//                     melodyRowFour: melodyArray[3],
//                     melodyRowFive: melodyArray[4],
//                     melodyRowSix: melodyArray[5],
//                     melodyRowSeven: melodyArray[6],
//                     melodyRowEight: melodyArray[7],
//                     melodyRowNine: melodyArray[8],
//                     melody2RowOne: melodyArrayTwo[0],
//                     melody2RowTwo: melodyArrayTwo[1],
//                     melody2RowThree: melodyArrayTwo[2],
//                     melody2RowFour: melodyArrayTwo[3],
//                     melody2RowFive: melodyArrayTwo[4],
//                     melody2RowSix: melodyArrayTwo[5],
//                     melody2RowSeven: melodyArrayTwo[6],
//                     melody2RowEight: melodyArrayTwo[7],
//                     melody2RowNine: melodyArrayTwo[8],
//                     bassRowOne: bassArray[0],
//                     bassRowTwo: bassArray[1],
//                     bassRowThree: bassArray[2],
//                     bassRowFour: bassArray[3],
//                     bassRowFive: bassArray[4],
//                     bassRowSix: bassArray[5],
//                     bassRowSeven: bassArray[6],
//                     bassRowEight: bassArray[7],
//                     bassRowNine: bassArray[8]
//                   }
//             API.sendTone()
//         }
//     }


//     return(
//         <div >
//             <h3>Send the sequence to whom?</h3>
//         <form onSubmit={sendSequence}>
//             <input value={user} onChange={setUser}></input>
//             <input></input>
//             <button>Send the sequence</button>
//         </form>
//         </div>
//     )
// }