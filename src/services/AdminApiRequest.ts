import axios from 'axios';

// Create an instance of Axios
export const AdminApiRequest = axios.create({
    baseURL: 'https://performance-damage-solving-aaron.trycloudflare.com/', // Replace with your desired base URL
    timeout: 60000, // Replace with your desired timeout in milliseconds
    headers: {
        'Content-Type': 'application/json', // Set the Content-Type header to JSON
        // Ngrok allow headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'ngrok-skip-browser-warning': 'true',
    },
});

// Add request interceptor
AdminApiRequest.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('adminToken')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('adminToken')}`;
        }
        return config;
    },
    (error) => {
        // Handle request error here
        return Promise.reject(error);
    }
);

// Add response interceptor
AdminApiRequest.interceptors.response.use(
    (response) => {
        // Modify the response data here if needed
        return response;
    },
    (error) => {
        // Handle response error here
        if (error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
