import { apiClient } from '@/api/config.js';

export const getTodos = () => apiClient.get('/todos');

export const getTodo = (id) => apiClient.get(`/todos/${id}`);
