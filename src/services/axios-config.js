import axios from "axios";

export const userApi = axios.create({
    baseURL: "http://localhost:8084/",
    headers: {
        "Content-Type": "application/json"
    }
});

export const aiApi = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});
