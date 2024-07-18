<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  variant: {
    type: String,
  }
})
</script>

<template>
  <Alert :class="variant" class="w-auto flex items-center m-2 px-3 py-2 text-white rounded-lg">
    <div class="ps-2 pe-4">
      <slot ></slot>
    </div>
    <div class="flex flex-col">
      
      <AlertTitle>{{ title }}</AlertTitle>
      <AlertDescription>
        {{ description }}
      </AlertDescription>
    </div>
  </Alert>
</template>