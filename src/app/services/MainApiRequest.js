import axios, { AxiosResponse } from 'axios';

// Create an instance of Axios
export const MainApiRequest = axios.create({
    baseURL: 'https://abca-222-253-79-230.ngrok-free.app/', // Replace with your desired base URL
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
MainApiRequest.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    },
    (error) => {
        // Handle request error here
        return Promise.reject(error);
    }
);

// Add response interceptor
MainApiRequest.interceptors.response.use(
    (response) => {
        // Modify the response data here if needed
        return response;
    },
    (error) => {
        // Handle response error here
        return Promise.reject(error);
    }
);
