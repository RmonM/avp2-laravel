import axios from 'axios';

// Cria uma instância do Axios com a URL base do backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  // Permite o envio de cookies/credenciais se o CORS estiver configurado
  withCredentials: true,
});

// Interceptor para adicionar o token de autenticação (Bearer Token)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); 
  
  if (token) {
    // Laravel Sanctum usa Bearer Token para autenticação de API
    config.headers['Authorization'] = `Bearer ${token}`; 
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;