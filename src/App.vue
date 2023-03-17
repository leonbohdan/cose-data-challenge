<script setup>
import { ref } from 'vue';

const drawer = ref(false);
const tab = ref('one');

const items = [
  {
    title: 'Todos',
    value: 'todos',
  },
  {
    title: 'Posts',
    value: 'posts',
  },
];
</script>

<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

        <v-toolbar-title>DataCose Vue Challenge</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        color="primary"
        temporary
      >
        <v-list
          :items="items"
        />
      </v-navigation-drawer>

      <v-main style="min-height: 100vh;">
        <v-container>
          <!--          <v-card class="pa-2">-->
          <!--            <v-data-table>-->
          <!--              table-->
          <!--            </v-data-table>-->
          <!--          </v-card>-->

          <v-card>
            <v-tabs
              v-model="tab"
              bg-color="primary"
            >
              <v-tab value="one">Item One</v-tab>
              <v-tab value="two">Item Two</v-tab>
              <v-tab value="three">Item Three</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="one">
                  One
                </v-window-item>

                <v-window-item value="two">
                  Two
                </v-window-item>

                <v-window-item value="three">
                  Three
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
