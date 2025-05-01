<template>
  <v-app>
    <v-layout class="todo-layout">
      <!-- Sidebar with rail (auto-collapse) -->
      <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          class="todo-sidebar"
      >
        <v-list-item
            title="Vue TODO"
            nav
        >
          <template #append>
            <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
            />
          </template>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list nav>
          <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              :title="item.title"
              :prepend-icon="item.icon"
              class="nav-item"
          />
        </v-list>
      </v-navigation-drawer>

      <!-- Main content -->
      <v-main class="main-area">
        <v-container class="main-container" fluid>
          <h1 class="view-title">Предстоящее</h1>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);
const rail = ref(true);

const menuItems = [
  { title: 'Входящие', icon: 'mdi-inbox-arrow-down' },
  { title: 'Сегодня', icon: 'mdi-calendar-today' },
  { title: 'Предстоящее', icon: 'mdi-calendar-month' },
];
</script>
<style scoped>
.todo-layout {
  font-family: 'Inter', sans-serif;
}

.todo-sidebar {
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  transition: width 0.3s;
}

.main-area {
  background-color: #f9fafc;
}

.main-container {
  padding: 24px;
}

.view-title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #2c3e50;
}

.nav-item {
  border-radius: 8px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #f0f0f0;
}
</style>