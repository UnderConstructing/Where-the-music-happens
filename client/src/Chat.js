import React from 'react'
import API from "./utils/API"
import { socket } from './utils/socket'

const Chat = props => {
    const [state, setState] = React.useState({
        message: "",
        messages: []
    })

    React.useEffect(() => {
        const getData = async () => {
            try {
                const messages = await API.getMessages()
                setState(state => ({ ...state, messages }))
            } catch (error) {
                console.log(error)
            }
        }
        getData()
        socket.on("reload", getData)
    }, [])

    const submitMessage = async () => {
        try {
            await API.postMessage({ message: state.message })
            socket.emit("message", state.message)

            setState({
                ...state,
                message: "",
                messages: [...state.messages, state.message]
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
                    state.messages.map((x, i) => <div key={i + '-msg'}>{x}</div>)
                }
            </div>
            <input className="chat-input" type="text" value={state.message} onChange={e => setState({ ...state, message: e.target.value })} />
            <button className="chat-submit" onClick={submitMessage}>Send</button>
        </div>
    )
}


export default Chat;