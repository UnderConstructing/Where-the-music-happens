import openHhArray from './templates/openhh.json'

export default function OpenHh() {
    function activateOpenhh(event) {
        console.log(event.target)
        if (openHhArray[event.target.id - 1].isActive === false) {
          openHhArray[event.target.id - 1].isActive = true
        }
        else {
          openHhArray[event.target.id - 1].isActive = false
        }
        console.log(event.target)
      }
    return (
        <div key="openhh" className="row openhh">
        {openHhArray.map((note) => (
          <div className="parent">
            <input type="checkbox" text={note.note} onClick={activateOpenhh} key={"openhh" +note.id} className={`box col${note.id} `} id={note.id}>
            </input>
            <label></label>
          </div>
        ))}
      </div>
    )
}