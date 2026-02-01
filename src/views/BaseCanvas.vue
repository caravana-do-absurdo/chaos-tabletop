<template>
    <div class="canvas-container">
        <img class="tile-to-use" ref="tileToUse" />
        <canvas ref="canvas" class="base-canvas"></canvas>
        <div class="watermark">Chaos tabletop - A product of Caravana do Absurdo</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useTilesStore } from '@/stores/tiles';
import { storeToRefs } from 'pinia'

const SIZE_OF_TILES = 32;

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
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 1;
        ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
        for (let i = 0; i <= canvas.value.width; i += SIZE_OF_TILES) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.value.height);
            ctx.stroke();
        }
        for (let i = 0; i <= canvas.value.height; i += SIZE_OF_TILES) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.value.width, i);
            ctx.stroke();
        }
    }
}

onMounted(() => {
    if (canvas.value) {
        canvas.value.width = canvas.value.offsetWidth;
        canvas.value.height = canvas.value.offsetHeight;
        const ctx = canvas.value.getContext('2d');
        if (ctx) {
            renderGridCanvas(ctx)
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
    }
});

const getCoordinates = (event: MouseEvent) => {
   const mouseX = event.clientX;
   const mouseY = event.clientY;
   return [Math.floor(mouseX / SIZE_OF_TILES), Math.floor(mouseY / SIZE_OF_TILES)];
}

const draw = () => {
    var ctx = canvas.value?.getContext("2d");
    if(!ctx) return
    renderGridCanvas(ctx)
   
   layers.value.forEach((layer) => {
      Object.keys(layer).forEach((key) => {
         var positionX = Number(key.split("-")[0]);
         var positionY = Number(key.split("-")[1]);
         let tileToRender = layer[key] as CanvasImageSource

         ctx?.drawImage(
            tileToRender,
            0,
            0,
            SIZE_OF_TILES,
            SIZE_OF_TILES,
            positionX * SIZE_OF_TILES,
            positionY * SIZE_OF_TILES,
            SIZE_OF_TILES,
            SIZE_OF_TILES
         );
      });
   });
}

const addTile = (mouseEvent: MouseEvent) => {
    if(!tileToUse.value || !layers.value[currentLayer.value]) return
    let clicked = getCoordinates(mouseEvent);
    let key = clicked[0] + "-" + clicked[1];

    if (mouseEvent.shiftKey) {
            delete layers.value[currentLayer.value]![key];
    } else {
            layers.value[currentLayer.value]![key] = tileToUse.value.cloneNode(true) as HTMLImageElement;
    }
    draw();
}

watch(selectedTile, (newVal) => {
    if (newVal && tileToUse.value) {
        tileToUse.value.src = newVal.src
    }
})
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

.tile-to-use {
    width: 32px;
    height: 32px;
    display: none;
}
</style>