import axios from "axios"
export const api = axios.create({
    baseURL: "https://be-damage-detection-kadal-perang-production.up.railway.app/api"
})