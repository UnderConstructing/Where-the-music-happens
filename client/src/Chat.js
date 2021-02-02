import React from 'react'
import API from "./utils/API"
import { socket } from './utils/socket'

const Chat = props => {
    const [theState, setTheState] = React.useState({
        message: "",
        messages: []
    })

    React.useEffect(() => {
        const getData = async () => {
            try {
                var chatArray = []
                await API.getMessages().then(res => {
                    console.log(res)
                    for(let i = 0; i < res.data.length; i++) {
                        console.log(res.data[i])
                        chatArray.push(res.data[i].message)
                    }
                    setTheState({
                        messages: chatArray
                    })
                }).then(res => console.log("ran get!"))

            } catch (error) {
                console.log(error)
            }
        }
        getData()
        socket.on("message", getData)
    }, [])

    const submitMessage = async () => {
        try {
            await API.postMessage({ message: theState.message })
            socket.emit("message", theState.message)
            setTheState({
                message: "",
                messages: [...theState.messages, theState.message]
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="chat">
            Chat
            <div className="chat-area">
                {
                    theState.messages.map((x, i) => 
                    (<div key={i + '-msg'}>{x}</div>
                    ))
                }
            </div>
            <input className="chat-input" type="text" value={theState.message} onChange={e => setTheState({ ...theState, message: e.target.value })} />
            <button className="chat-submit" onClick={submitMessage}>Send</button>
        </div>
    )
}


export default Chat;