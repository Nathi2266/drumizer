import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Change to your backend URL
});

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);

export const uploadSample = (formData, token) =>
  API.post('/upload-sample', formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });

export const generateDrums = (data, token) =>
  API.post('/generate-drums', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
