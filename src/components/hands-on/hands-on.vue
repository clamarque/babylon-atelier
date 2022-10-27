<script setup lang="ts">
import SceneDisplay from '@/components/sceneDisplay/scene-display.vue';

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="hands-on">
    <h1 class="green">Welcome!</h1>
    <div class="scene-display-container">
      <SceneDisplay/>
    </div>
  </div>
</template>

<style scoped>

</style>
