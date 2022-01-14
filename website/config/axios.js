import axios from "axios";
import config from "./index"

const instance = axios.create({
    baseURL: config.serverUrl,
    withCredentials: true
});

export default instance