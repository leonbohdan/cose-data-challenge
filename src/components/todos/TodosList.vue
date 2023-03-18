<script setup>
import { ref, computed } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { useTodosStore } from '@/components/todos/todosStore.js';
import BaseSearch from '@/components/base/BaseSearch.vue';

const todosStore = useTodosStore();

todosStore.getTodos();

const search = ref('');

const headers = [
  {
    key: 'title',
    title: 'Name',
    sortable: false,
    filterable: true,
  }, {
    key: 'completed',
    title: 'Completed',
    sortable: false,
  },
];

const handleCompleted = (isCompleted) => {
  return isCompleted
    ? {
      icon: 'mdi-checkbox-marked-outline',
      color: 'success',
    }
    : {
      icon: 'mdi-checkbox-blank-outline',
      color: 'orange',
    };
};

const filteredTodos = computed(() => {
  if (!search.value) {
    return todosStore.todos;
  }

  return todosStore.todos.filter(({ title }) => title.includes(search.value));
});

</script>

<template>
  <v-card
    :loading="todosStore.todosLoading"
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
      :items="filteredTodos"
      :search="search"
    >
      <template #item.completed="{ item }">
        <v-icon
          :icon="handleCompleted(item.completed).icon"
          :color="handleCompleted(item.completed).color"
        />
      </template>
    </v-data-table>
  </v-card>
</template>
