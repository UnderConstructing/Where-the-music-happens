import axios from "axios"

export default {
    getMessages: () => axios.get("/api/msg"),
    postMessage: data => axios.post("/api/msg", data),

    getUsers: () => axios.get("/api/user"),
    logout: () => axios.get("/auth/logout"),
    login: data => axios.post("/auth/login", data, {
        withCredentials: true
    }),
    register: data => axios.post("/auth/register", data, {
        withCredentials: true
    }),
    saveTone: data => axios.post("/api/tone", data, {
        withCredentials: true
    })
}