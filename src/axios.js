import axios from "axios";

const weatherAPI = axios.create({
    baseURL: "https://api.openweathermap.org/",
});

export default weatherAPI;
