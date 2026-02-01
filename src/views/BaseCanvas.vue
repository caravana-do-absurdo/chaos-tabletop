<template>
    <div class="canvas-container">
        <canvas ref="canvas" class="base-canvas"></canvas>
        <div class="watermark">Chaos tabletop - A product of Caravana do Absurdo</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
    if (canvas.value) {
        canvas.value.width = canvas.value.offsetWidth;
        canvas.value.height = canvas.value.offsetHeight;
        const ctx = canvas.value.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
        }
    }
});
</script>

<style scoped>
.canvas-container {
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    position: absolute;
}

.base-canvas {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
}

.watermark {
    position: absolute;
    bottom: 10px;
    right: 10px;
    left: 10px;
    text-align: center;
    font-size: 12px;
    color: rgb(255, 225, 0.5);
    font-family: Arial, sans-serif;
    pointer-events: none;
}
</style>