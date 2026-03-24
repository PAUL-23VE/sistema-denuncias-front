import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const denunciasService = {
  crear: (data) => api.post('/denuncias', data),
  obtenerTodas: () => api.get('/denuncias'),
};