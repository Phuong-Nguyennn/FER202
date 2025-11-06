import axios from 'axios';
export const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
});
export const getUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};
