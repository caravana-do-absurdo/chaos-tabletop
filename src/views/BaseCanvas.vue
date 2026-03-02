<template>
    <div class="canvas-container">
        <div class="zoom-controls">
            <button @click="zoomOut">-</button>
            <span>Zoom: {{ (scale * 100).toFixed(0) }}%</span>
            <button @click="zoomIn">+</button>
        </div>
        <img class="tile-to-use" ref="tileToUse" />
        <canvas ref="canvas" class="base-canvas"></canvas>
        <div class="watermark">Chaos tabletop - A product of Caravana do Absurdo</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
const SIZE_OF_TILES = 32;
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.1;
const scale = ref(1);
import { useTilesStore } from '@/stores/tiles';
import { storeToRefs } from 'pinia'

const canvas = ref<HTMLCanvasElement>();
const tileToUse = ref<HTMLImageElement>();
const isMouseDown = ref(false);
const currentLayer = ref(0);
const layers = ref<Array<Record<string, CanvasImageSource>>>([{}, {}, {}])
const tilesStore = useTilesStore()
const { selectedTile } = storeToRefs(tilesStore)

const renderGridCanvas = (ctx: CanvasRenderingContext2D ) => {
    if (canvas.value) {
        ctx.fillStyle = '#000';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
        const tileSize = SIZE_OF_TILES * scale.value;
        for (let i = 0; i <= canvas.value.width; i += tileSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.value.height);
            ctx.stroke();
        }
        for (let i = 0; i <= canvas.value.height; i += tileSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.value.width, i);
            ctx.stroke();
        }
    }
}

onMounted(() => {
    if (canvas.value) {
        canvas.value.width = CANVAS_WIDTH;
        canvas.value.height = CANVAS_HEIGHT;
        const ctx = canvas.value.getContext('2d');
        if (ctx) {
            renderGridCanvas(ctx);
        }
        canvas.value.addEventListener("mousedown", () => {
            isMouseDown.value = true;
        });
        canvas.value.addEventListener("mouseup", () => {
            isMouseDown.value = false;
        });
        canvas.value.addEventListener("mouseleave", () => {
            isMouseDown.value = false;
        });
        canvas.value.addEventListener("mousedown", addTile);
        canvas.value.addEventListener("mousemove", (event) => {
            if (isMouseDown.value) {
                addTile(event);
            }
        });
        canvas.value.addEventListener("wheel", (event) => {
            event.preventDefault();
            if (event.deltaY < 0) {
                zoomIn();
            } else {
                zoomOut();
            }
        });
    }
});

const getCoordinates = (event: MouseEvent) => {
    if (!canvas.value) return [0, 0];
    const rect = canvas.value.getBoundingClientRect();
    // Map mouse position to logical canvas coordinates
    const mouseX = (event.clientX - rect.left) / scale.value;
    const mouseY = (event.clientY - rect.top) / scale.value;
    return [Math.floor(mouseX / SIZE_OF_TILES), Math.floor(mouseY / SIZE_OF_TILES)];
}

const draw = () => {
    const ctx = canvas.value?.getContext("2d");
    if (!ctx) return;
    renderGridCanvas(ctx);
    const tileSize = SIZE_OF_TILES * scale.value;
    layers.value.forEach((layer) => {
        Object.keys(layer).forEach((key) => {
            const positionX = Number(key.split("-")[0]);
            const positionY = Number(key.split("-")[1]);
            const tileToRender = layer[key] as CanvasImageSource;
            ctx?.drawImage(
                tileToRender,
                0,
                0,
                SIZE_OF_TILES,
                SIZE_OF_TILES,
                positionX * tileSize,
                positionY * tileSize,
                tileSize,
                tileSize
            );
        });
    });
}

const addTile = (mouseEvent: MouseEvent) => {
    if(!tileToUse.value || !layers.value[currentLayer.value]) return
    const clicked = getCoordinates(mouseEvent);
    const key = clicked[0] + "-" + clicked[1];

    if (mouseEvent.shiftKey) {
            delete layers.value[currentLayer.value]![key];
    } else {
            layers.value[currentLayer.value]![key] = tileToUse.value.cloneNode(true) as HTMLImageElement;
    }
    draw();
}

watch(selectedTile, (newVal) => {
    if (newVal && tileToUse.value) {
        tileToUse.value.src = newVal.src;
    }
});

const zoomIn = () => {
    if (scale.value < MAX_SCALE) {
        scale.value = Math.min(MAX_SCALE, scale.value + SCALE_STEP);
        draw();
    }
};
const zoomOut = () => {
    if (scale.value > MIN_SCALE) {
        scale.value = Math.max(MIN_SCALE, scale.value - SCALE_STEP);
        draw();
    }
};
</script>

<style scoped>
.canvas-container {
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    position: absolute;
    min-width: 1920px;
    min-height: 1080px;
}

.zoom-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.base-canvas {
    display: block;
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

.tile-to-use {
    width: 32px;
    height: 32px;
    display: none;
}
</style>
