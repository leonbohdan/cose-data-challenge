import { apiClient } from '@/api/config.js';

export const getPosts = () => apiClient.get('/posts');

export const getPost = (id) => apiClient.get(`/posts/${id}`);
