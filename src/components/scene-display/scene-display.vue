<template>
  <div class="scene-display">
    <canvas ref="bjsCanvas" width="1600" height="750"></canvas>
  </div>
</template>

<script lang="ts">
import { createScene } from "@/components/scene-display/scene-display.service";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: [],
  components: {},
  setup() {
    const bjsCanvas = ref<HTMLCanvasElement | null>(null);
    return {
      bjsCanvas,
    };
  },
  mounted() {
    if (this.bjsCanvas !== null) {
      createScene(this.bjsCanvas);
    }
  },
});
</script>

<style scoped>
</style>
