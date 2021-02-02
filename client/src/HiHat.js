import hiHatArray from './templates/hihat.json'

export default function HiHat() {
    function activateHiHat(event) {
        console.log(event.target)
        if (hiHatArray[event.target.id - 1].isActive === false) {
          hiHatArray[event.target.id - 1].isActive = true
        }
        else {
          hiHatArray[event.target.id - 1].isActive = false
          hiHatArray[event.target.id - 1].addAttribute('className', 'disapper')
        }
        console.log(event.target)
      }
    return (
        <div key="hihat" className="row snare">
        {hiHatArray.map((note) => (
          <div className="parent">
            <input type="checkbox" text={note.note} onClick={activateHiHat} key={"hihat" + note.id} className="box" id={note.id}>
            </input>
            <label></label>
          </div>
        ))}
      </div>
    )
}