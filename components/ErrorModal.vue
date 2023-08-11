<script setup lang="ts">
defineProps({
  show: Boolean,
})
</script>

<template>
  <Transition name="modal">
    <div class="modal" :class="{ 'modal-open': show }">
      <div class="modal-box">
        <slot name="header">Error</slot>
        <slot name="body">Error</slot>
        <div class="modal-action">
          <button class="btn bg-orange-button hover:bg-orange-hover text-white font-semibold" @click="$emit('close')">Tutup</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
