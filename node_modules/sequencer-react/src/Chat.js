import React from 'react'
import { socket } from './utils/socket'

const Chat = props => {
    const [state, setState] = React.useState({
        message: "",
        messages: []
    })

    React.useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch("/api")
                const messages = await res.json()
                setState(state => ({ ...state, messages }))
            } catch (error) {
                console.log(error)
            }
        }
        getData()
        socket.on("reload", getData)
    }, [])

    const submitMessage = () => {
        socket.emit("message", state.message)

        setState({
            ...state,
            message: "",
            messages: [...state.messages, state.message]
        })
    }

    return (
    <div className="chat">
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