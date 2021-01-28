import io from "socket.io-client"

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const url = isDev ? "http://localhost:3000" : "deployed_url"

export const socket = io(url, { transports: ['websocket']})