<template>
  <v-dialog v-model="dialogModel" max-width="360">
    <v-card>
      <v-card-title class="text-h6">Удалить проект?</v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить проект "{{ project?.name }}"?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cancel">Отмена</v-btn>
        <v-btn color="error" @click="confirm">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import type { Project } from '../models/Project';

const props = defineProps<{
  modelValue: boolean;
  project: Project | null;
}>();

const emit = defineEmits(['update:modelValue', 'confirm']);

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function cancel() {
  emit('update:modelValue', false);
}

function confirm() {
  emit('confirm');
  emit('update:modelValue', false);
}
</script>
