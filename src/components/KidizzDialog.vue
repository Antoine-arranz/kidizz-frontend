<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
  >
    <div class="bg-white p-5 rounded-lg shadow-xl max-w-sm">
      <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
      <p class="mb-4">
        {{ message }}
      </p>
      <div class="flex justify-between space-x-3">
        <KidizzButton variant="secondary" @click="onCancel">
          {{ cancelText }}
        </KidizzButton>
        <KidizzButton variant="primary" @click="onConfirm" :is-loading="isLoading">
          {{ confirmText }}
        </KidizzButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KidizzButton from '@/components/KidizzButton.vue'

interface Props {
  show: boolean
  title: string
  message: string
  cancelText?: string
  confirmText?: string
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  cancelText: 'Annuler',
  confirmText: 'Confirmer',
  confirmVariant: 'danger',
  isLoading: false
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const onCancel = () => emit('cancel')
const onConfirm = () => emit('confirm')
</script>
