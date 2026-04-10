import axios from "axios";

const api = axios.create({
    baseURL: 'https://cadastro-users-backend-production.up.railway.app'
});

export default api;