<template>
  <input
    :name="name"
    :type="type"
    :value="modelValue"
    @input="handleInput"
    :required="required"
    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-kidizz-primary focus:border-kidizz-primary transition duration-300 ease-in-out"
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (target && target.value != null) {
    emit('update:modelValue', target.value)
  }
}
</script>
