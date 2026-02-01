<template>
    <div class="tiles-area">
        <div class="tiles-area-wrapper">
            <img
                class="tile"
                :class="{ 'selected-tile': selectedTileIndex === index }"
                v-for="(tile, index) in allTiles"
                :key="tile.name"
                :src="tile.src"
                :alt="tile.name"
                @click="handleImageClick(index)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTilesStore } from '@/stores/tiles';
import { storeToRefs } from 'pinia'

const tilesStore = useTilesStore()
const { selectedTileIndex } = storeToRefs(tilesStore)
const { allTiles, selectNewTile } = useTilesStore()

const handleImageClick = (index: number) => {
    selectNewTile(index)
}

</script>

<style scoped>
.tiles-area {
    position: fixed;
    width: 30%;
    top: 85px;
    bottom: 20px;
    left: 20px;
    background-color: black;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 99;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.tile {
    cursor: pointer;
    width: 64px;
    margin: 5px;
    border-radius: 4px;
}

.selected-tile {
    border: 1px solid yellow;
}

</style>