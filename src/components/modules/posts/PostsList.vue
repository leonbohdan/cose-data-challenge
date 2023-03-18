<script setup>
import { computed, ref } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { usePostsStore } from '@/components/modules/posts/postsStore.js';
import { getUser } from '@/api/userApi.js';
import BaseSearch from '@/components/base/BaseSearch.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';

const postsStore = usePostsStore();

postsStore.getPosts();

const search = ref('');
const userName = ref('');
const isShowDialog = ref(false);

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

const handleClickRow = async ({ target }, { item }) => {
  const userId = item.raw.userId;

  const { data } = await getUser(userId);

  userName.value = data.name;
  isShowDialog.value = true;
};

const description = computed(() => {
  return `Post is created by: <b>${userName.value}</b>`;
});

</script>

<template>
  <v-card
    :loading="postsStore.postsLoading"
    border
  >
    <v-expand-transition>
      <v-row dense align="center">
        <v-col cols="6" class="pa-4">
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
      item-value="id"
      @click:row="handleClickRow"
    />
  </v-card>

  <BaseDialog
    v-model="isShowDialog"
    :description="description"
  />
</template>
