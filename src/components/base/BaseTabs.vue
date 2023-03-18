<script setup>
import { ref, watch } from 'vue';
import PostsList from '@/components/modules/posts/PostsList.vue';
import TodosList from '@/components/modules/todos/TodosList.vue';

const tab = ref('todos');

const items = [
  {
    title: 'Todos',
    value: 'todos',
    component: TodosList,
  },
  {
    title: 'Posts',
    value: 'posts',
    component: PostsList,
  },
];
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
      show-arrows
    >
      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :value="item.value"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="todos">
          <TodosList/>
        </v-window-item>

        <v-window-item value="posts">
          <PostsList/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style>
.v-table > .v-table__wrapper > table > tbody .expanded-bg-color {
  background-color: #eee;
}
</style>
