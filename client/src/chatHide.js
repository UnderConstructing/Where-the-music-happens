import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import AuthContext from './utils/Context/AuthContext';
import chat from 'client/src/ChatComponent.js'

export default function ChatApp() {
    const [visible, setVisible] = useState("visible")
    const [word, setWord] = useState("Hide")

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
    return (
        <>
            <button onClick={toggler}>{`${word} Chat`}</button>
            <div className={`grid ${visible}`}>
            </div>
        </>
    )
}