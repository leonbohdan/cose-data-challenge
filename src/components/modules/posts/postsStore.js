import { defineStore, acceptHMRUpdate } from 'pinia';
import { getPosts } from '@/components/modules/posts/postsApi.js';

export const usePostsStore = defineStore('postsStore', {
  state: () => ({
    posts: [],
    postsLoading: false,
  }),

  actions: {
    async getPosts() {
      try {
        this.postsLoading = true;

        const { data } = await getPosts();

        this.posts = data;
      } finally {
        this.postsLoading = false;
      }
    },
  },

  getters: {},
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot));