import { apiClient } from '@/api/config.js';

export const getUser = (id) => apiClient.get(`/users/${id}`);
