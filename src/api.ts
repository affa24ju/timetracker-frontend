import axios from "axios";

//import.meta.env.PROD är en miljövariabel som är true, om applikationen körs i produktions läge
// med npm run build
//Här, När deployar frontend med 'npm run build' används det länken från Digitalocean för backend
//Annars körs den lokalt med localhost:8080
//Har lagt /api både i produktion och lokal url, så slipper jag ha '/api' varje gång
const BASE_URL = import.meta.env.PROD
    ? "https://timetrackerbackend-app-lndqf.ondigitalocean.app/api"
    : "http://localhost:8080/api";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },       
});

