<template>
  <v-dialog v-model="dialogModel" max-width="400">
    <v-card>
      <v-card-title>Редактировать проект</v-card-title>
      <v-card-text>
        <v-text-field
            v-model="name"
            label="Название проекта"
            prepend-icon="mdi-pencil"
            clearable
            :error="!!error"
            :error-messages="error"
        />

        <v-color-picker
            v-model="color"
            hide-inputs
            hide-canvas
            show-swatches
            swatches-max-height="120"
            class="mt-4"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cancel">Отмена</v-btn>
        <v-btn color="primary" @click="submit">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, watch } from 'vue';
import { Project } from '../models/Project';
import { ProjectRepository } from '../service/ProjectRepository';

const props = defineProps<{
  modelValue: boolean;
  project: Project | null;
}>();

const emit = defineEmits(['update:modelValue', 'submit']);

const dialogModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const name = ref('');
const color = ref('#2196f3');
const error = ref('');

watch(() => props.modelValue, (val) => {
  if (val && props.project) {
    name.value = props.project.name;
    color.value = props.project.color;
    error.value = '';
  }
});

function cancel() {
  emit('update:modelValue', false);
}

function submit() {
  const trimmed = name.value.trim();
  if (trimmed.length < 3) {
    error.value = 'Название должно быть не менее 3 символов';
    return;
  }

  if (props.project) {
    const updated = new Project(props.project.id, trimmed, color.value);
    new ProjectRepository().update(updated);
    emit('submit', updated);
    emit('update:modelValue', false);
  }
}
</script>
