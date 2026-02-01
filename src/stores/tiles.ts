import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTilesStore = defineStore('tiles', () => {
    const tileImages = import.meta.glob<{ default: string }>('/src/assets/tiles/*.png', { eager: true })
    const allTiles = ref(Object.entries(tileImages).map(([path, module]) => ({
        src: module.default,
        name: path.split('/').pop()
    })))
    const selectedTileIndex = ref(0)
    const selectedTile = ref(allTiles.value[selectedTileIndex.value])

    const selectNewTile = (index: number) => {
        if (allTiles.value[index]) {
            console.log('allTiles.value[index]', allTiles.value[index])
            selectedTileIndex.value = index;
            selectedTile.value = allTiles.value[index]
        }
    }

     return { allTiles, selectedTileIndex, selectedTile, selectNewTile }
})
