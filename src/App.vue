<script setup lang="ts">
import BaseCanvas from './views/BaseCanvas.vue';
import TilesButton from './components/TilesButton.vue';
import DiceButton from './components/DiceButton.vue';
import ActivityLogView from './views/ActivityLogView.vue';
</script>

<template>
  <BaseCanvas />
  <ActivityLogView />
  <TilesButton />
  <DiceButton />
</template>

<style scoped>

</style>
