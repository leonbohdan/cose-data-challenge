<script setup>
import { computed, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { usePostsStore } from '@/components/posts/postsStore.js';
import BaseSearch from '@/components/base/BaseSearch.vue';

const postsStore = usePostsStore();

postsStore.getPosts();

const search = ref('');

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

const filteredPosts = computed(() => {
  if (!search.value) {
    return postsStore.posts;
  }

  return postsStore.posts.filter(({ title }) => title.includes(search.value));
});

</script>

<template>
  <v-card
    :loading="postsStore.postsLoading"
    border
  >
    <v-expand-transition>
      <v-row dense align="center">
        <v-col cols="4" class="pa-4">
          <BaseSearch
            v-model="search"
          />
        </v-col>
      </v-row>
    </v-expand-transition>

    <v-data-table
      :items-per-page="50"
      :headers="headers"
      :items="filteredPosts"
      :search="search"
    />
  </v-card>
</template>
