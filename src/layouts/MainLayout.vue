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
        <div class=" d-flex flex-column justify-space-between h-100">
        <!-- Top section -->
          <div class="">
            <v-list-item title="Vue TODO" nav>
              <template #append>
                <v-btn
                    icon="mdi-chevron-left"
                    variant="text"
                    @click.stop="rail = !rail"
                />
              </template>
            </v-list-item>

            <v-list-item
                prepend-icon="mdi-theme-light-dark"
                title="Тема"
                @click="toggleTheme"
            />

            <v-divider class="my-2" />

            <v-list nav>
              <v-list-item
                  v-for="item in menuItems"
                  :key="item.title"
                  :title="item.title"
                  :prepend-icon="item.icon"
                  color="primary"
                  variant="tonal"
                  rounded="lg"
              />
            </v-list>
            <v-list nav>
              <v-list-item
                  v-for="project in projects"
                  :key="project.id"
                  :title="!rail ? project.name : ''"
                  :prepend-icon="'mdi-circle'"
                  color="primary"
                  :style="{ color: project.color }"
                  variant="tonal"
                  rounded="lg"
              >
                

              </v-list-item>
            </v-list>
          </div>

          <!-- Bottom button -->
          <div class="pa-2">
            <v-btn
                block
                prepend-icon="mdi-plus"
                color="primary"
                variant="flat"
                @click="showCreateProjectDialog"
            >
              <span v-if="!rail">Создать проект</span>
            </v-btn>
          </div>
        </div>
      </v-navigation-drawer>

      <!-- Main content -->
      <v-main class="main-area">
        <v-container class="main-container" fluid>
          <h1 class="view-title">Предстоящее</h1>
          <CreateProjectDialog
              v-model="stateCreateProject"
              @submit="handleProjectSubmit"
          />
          <DeleteProjectDialog
              v-model="confirmDeleteDialog"
              :project="projectToDelete"
              @confirm="confirmDelete"
          />

          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';

import CreateProjectDialog from '../components/CreateProjectDialog.vue';
import DeleteProjectDialog from '../components/DeleteProjectDialog.vue';

import { Project } from '../models/Project';
import { ProjectRepository } from '../service/ProjectRepository';

// sidebar
const drawer = ref(true);
const rail = ref(true);

// dark/light theme
const theme = useTheme();
const isDark = ref(false);
function toggleTheme() {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? 'dark' : 'light';
}

// projects
const projectRepo = new ProjectRepository();
const projects = ref<Project[]>(projectRepo.getAll());

const stateCreateProject = ref(false);
const showCreateProjectDialog = () => {
  stateCreateProject.value = true;
};

function handleProjectSubmit(project: Project) {
  projectRepo.add(project);
  projects.value.push(project);
}

// delete project
const confirmDeleteDialog = ref(false);
const projectToDelete = ref<Project | null>(null);

function askDeleteProject(project: Project) {
  projectToDelete.value = project;
  confirmDeleteDialog.value = true;
}

function confirmDelete() {
  if (!projectToDelete.value) return;
  projectRepo.delete(projectToDelete.value.id);
  projects.value = projects.value.filter(p => p.id !== projectToDelete.value?.id);
  projectToDelete.value = null;
  confirmDeleteDialog.value = false;
}

// static nav menu
const menuItems = [
  { title: 'Входящие', icon: 'mdi-inbox-arrow-down' },
  { title: 'Сегодня', icon: 'mdi-calendar-today' },
  { title: 'Предстоящее', icon: 'mdi-calendar-month' },
];
</script>

<style scoped>
/* Layout structure */
.todo-layout {
  font-family: 'Inter', sans-serif;
}

.todo-sidebar {
  height: 100vh;
  overflow: hidden;
  background-color: var(--v-theme-surface);
  border-right: 1px solid #e0e0e0;
  transition: width 0.3s, background-color 0.3s;
}

.main-area {
  background-color: var(--v-theme-background);
  transition: background-color 0.3s;
}

.main-container {
  padding: 24px;
}

/* Typography */
.view-title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--v-theme-on-background);
}


.project-item {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.project-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.project-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
}

.project-name {
  flex-grow: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
