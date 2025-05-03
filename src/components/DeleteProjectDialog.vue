<template>
  <v-dialog v-model="dialogModel" max-width="400" persistent>
    <v-card class="pa-6 text-center">
      <div class="d-flex justify-center mb-2">
        <v-icon
            size="64"
            color="error"
            class="icon-trash"
        >
          mdi-trash-can
        </v-icon>
      </div>

      <div class="text-h6 font-weight-bold mb-2">
        Удалить проект?
      </div>

      <div class="text-body-2 text-medium-emphasis mb-6">
        Вы уверены, что хотите удалить проект
        <b>«{{ project?.name }}»</b>? Это действие нельзя отменить.
      </div>

      <v-row dense>
        <v-col cols="6">
          <v-btn block variant="outlined" @click="cancel">
            Отменить
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block color="error" variant="flat" @click="confirm">
            Удалить
          </v-btn>
        </v-col>
      </v-row>
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

<style scoped>
.icon-trash {
  margin-bottom: 4px;
}
</style>
