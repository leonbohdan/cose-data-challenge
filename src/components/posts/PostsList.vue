<script setup>
import { VDataTable } from 'vuetify/labs/components';
import { usePostsStore } from '@/components/posts/postsStore.js';

const postStore = usePostsStore();

postStore.getPosts();

const headers = [
  {
    key: 'title',
    title: 'Name',
    sortable: false,
  }, {
    key: 'body',
    title: 'Description',
    sortable: false,
  },
];

</script>

<template>
  <v-card
    :loading="postStore.postsLoading"
    border
  >
    <v-data-table
      :items-per-page="50"
      :headers="headers"
      :items="postStore.posts"
    />
  </v-card>
</template>
