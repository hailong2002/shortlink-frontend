import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://shortlink.io.vn",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;