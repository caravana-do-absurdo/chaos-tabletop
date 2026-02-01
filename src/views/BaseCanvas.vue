<template>
    <div class="canvas-container">
        <canvas ref="canvas" class="base-canvas"></canvas>
        <div class="watermark">Chaos tabletop - A product of Caravana do Absurdo</div>
    </div>
</template>

<script>
export default {
    name: 'BaseCanvas',
    mounted() {
        const canvas = this.$refs.canvas;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
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