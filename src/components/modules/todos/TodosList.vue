<script setup>
import { ref, computed } from 'vue';
import { VDataTable } from 'vuetify/labs/components';
import { useTodosStore } from '@/components/modules/todos/todosStore.js';
import { getUser } from '@/api/userApi.js';
import BaseSearch from '@/components/base/BaseSearch.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';

const todosStore = useTodosStore();

todosStore.getTodos();

const search = ref('');
const userName = ref('');
const isShowDialog = ref(false);

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

const handleClickRow = async ({ target }, { item }) => {
  const userId = item.raw.userId;

  const { data } = await getUser(userId);

  userName.value = data.name;
  isShowDialog.value = true;
};

const description = computed(() => {
  return `Todo is created by: <b>${userName.value}</b>`;
});

</script>

<template>
  <v-card
    :loading="todosStore.todosLoading"
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
      :items="filteredTodos"
      :search="search"
      item-value="id"
      @click:row="handleClickRow"
    >
      <template #item.completed="{ item }">
        <v-icon
          :icon="handleCompleted(item.completed).icon"
          :color="handleCompleted(item.completed).color"
        />
      </template>
    </v-data-table>
  </v-card>

  <BaseDialog
    v-model="isShowDialog"
    :description="description"
  />
</template>
