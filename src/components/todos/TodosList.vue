<script setup>
import { VDataTable } from 'vuetify/labs/components';
import { useTodosStore } from '@/components/todos/todosStore.js';

const todosStore = useTodosStore();

todosStore.getTodos();

const headers = [
  {
    key: 'title',
    title: 'Name',
    sortable: false,
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

</script>

<template>
  <v-card
    :loading="todosStore.todosLoading"
    border
  >
    <v-data-table
      :items-per-page="50"
      :headers="headers"
      :items="todosStore.todos"
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
