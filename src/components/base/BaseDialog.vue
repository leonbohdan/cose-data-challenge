<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:model-value']);

const handleButtonClick = () => {
  emit('update:model-value', false);
};
</script>

<template>
  <div class="text-center">
    <v-dialog
      :model-value="modelValue"
      width="auto"
      persistent
    >
      <v-card>
        <v-card-text v-if="description">
          <span v-html="description"/>
        </v-card-text>

        <v-card-text v-else>
          No description
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" block @click="handleButtonClick">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
