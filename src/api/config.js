import axios from 'axios';

const baseApiUrl = 'https://jsonplaceholder.typicode.com/';

export const apiClient = axios.create({
  baseURL: baseApiUrl,
});
