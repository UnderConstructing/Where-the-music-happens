import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import './Chat.css'
import io from "socket.io-client";
import AuthContext from './utils/Context/AuthContext'


const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
  background-color: white;
  z-index: 100;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 6vh;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: white;
  border: 1px solid lightgray;
  outline: none;
  color: black;
  letter-spacing: 1px;
  line-height: 20px;
  z-index: 100;
  ::placeholder {
    color: grey;

  }
`;

const Button = styled.button`
  background-color: #EC7263;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: wheat;
  font-size: 17px;
  z-index: 100;
`;

const Form = styled.form`
  width: 400px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: pink;
  color: #EC7263;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const OtherRow = styled(MyRow)`
  justify-content: flex-start;
`;

const OtherMessage = styled.div`
  width: 45%;
  background-color: lightgrey;
  color: #EC7263;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

const ChatApp = () => {
    const userInfo = useContext(AuthContext)
    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState("invisible")
    const [word, setWord] = useState("Show")
    const toggler = () => {
        if (visible === "visible") {
            setVisible("invisible")
            setWord("Show")
        }
        else {
            setVisible("visible")
            setWord("Hide")
        }
    }

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourID(id);
        })

        socketRef.current.on("message", (message) => {
            console.log("here");
            receivedMessage(message);
        })
    }, [socketRef]);

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: `${userInfo.user.username}: ${message}`,
            id: yourID,
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    return (
        <>
        <button className='hide-chat' onClick={toggler}>{word} Chat</button>
        <div className={`chat-main ${visible}`}>
            <ChatContainer className="scrollbar">
                {messages.map((message, index) => {
                    if (message.id === yourID) {
                        return (
                            <MyRow key={index}>
                                <MyMessage>
                                    {message.body}
                                </MyMessage>
                            </MyRow>
                        )
                    }
                    return (
                        <OtherRow key={index}>
                            <OtherMessage>
                                {message.body}
                            </OtherMessage>
                        </OtherRow>
                    )
                })}
            </ChatContainer>
            <Form onSubmit={sendMessage}>
                <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
                <Button>Send</Button>
            </Form>
        </div>
    </>    
    );
};

export default ChatApp;
