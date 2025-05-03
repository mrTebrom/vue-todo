<template>
  <v-dialog v-model="dialogModel" max-width="400">
    <v-card>
      <v-card-title>Создание проекта</v-card-title>
      <v-card-text>
        <v-text-field
            v-model="projectName"
            label="Название проекта"
            prepend-icon="mdi-folder"
            autofocus
            clearable
            :error="!!error"
            :error-messages="error"
        />

        <div class="mt-4">
          <div class="text-caption mb-1">Цвет проекта</div>
          <v-color-picker
              v-model="projectColor"
              mode="rgba"
              hide-inputs
              show-swatches
              swatches-max-height="120"
              elevation="0"
              style="width: 100%"
          />
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Отмена</v-btn>
        <v-btn color="primary" @click="submit">Создать</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, watch } from 'vue';
import { Project } from '../models/Project';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', value: Project): void;
}>();

const projectName = ref('');
const projectColor = ref('#2196f3');
const error = ref('');

const dialogModel = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

function close() {
  emit('update:modelValue', false);
  projectName.value = '';
  projectColor.value = '#2196f3';
  error.value = '';
}

function submit() {
  const name = projectName.value.trim();

  if (name.length < 3) {
    error.value = 'Название должно быть не короче 3 символов';
    return;
  }

  const newProject = new Project(crypto.randomUUID(), name, projectColor.value);
  emit('submit', newProject);
  close();
}

watch(() => props.modelValue, val => {
  if (val) {
    projectName.value = '';
    projectColor.value = '#2196f3';
    error.value = '';
  }
});
</script>
