<script setup lang="ts">
defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target?.value)"
    :type="type"
    :placeholder="placeholder"
    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-kidizz-gray-300 placeholder-kidizz-gray-500 text-kidizz-gray-900 focus:outline-none focus:ring-kidizz-blue-500 focus:border-kidizz-blue-500 focus:z-10 sm:text-sm"
  />
</template>
