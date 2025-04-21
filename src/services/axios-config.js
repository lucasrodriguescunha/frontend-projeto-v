import axios from "axios";

const api = axios.create({
    baseURL: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
