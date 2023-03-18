import { defineStore, acceptHMRUpdate } from 'pinia';
import { getTodos } from '@/components/todos/todosApi.js';

export const useTodosStore = defineStore('todosStore', {
  state: () => ({
    todos: [],
    todosLoading: false,
  }),

  actions: {
    async getTodos() {
      try {
        this.todosLoading = true;

        const { data } = await getTodos();

        this.todos = data;
      } finally {
        this.todosLoading = false;
      }
    },
  },

  getters: {},
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot));
