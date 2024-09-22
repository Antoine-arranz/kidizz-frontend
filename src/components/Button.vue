<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  }
})

const classes = computed(() => {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses = {
    primary: 'text-white bg-kidizz-blue-500 hover:bg-kidizz-blue-600 focus:ring-kidizz-blue-500',
    secondary:
      'text-white bg-kidizz-green-500 hover:bg-kidizz-green-600 focus:ring-kidizz-green-500'
  }
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
})
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>
