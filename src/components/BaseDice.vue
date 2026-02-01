<template>
    <div class="dice-container">
        <div v-if="!isRolling" class="dice-display">
            <div :class="['dice-icon', `d${facets}`]">
                {{ facets }}
            </div>
        </div>
        <div v-else class="dice-rolling">
            <div class="dice-3d">
                <div :class="['dice-face', `d${facets}`, { finished: finishedRolling }]">{{ currentFace }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLogStore } from '@/stores/log';
import type { DiceNumbers } from '@/types';
import { ref, watch } from 'vue'

interface Props {
    facets: DiceNumbers
    isRolling: boolean
}

const props = defineProps<Props>()

const currentFace = ref(1)
const finishedRolling = ref(false)
const { addLogMsg } = useLogStore()

const logResult = () => {
    addLogMsg(`Rolled d${props.facets} --> ${currentFace.value}`)
}

const roll = async () => {
    currentFace.value = 1

    const rollDuration = 1000
    const rollIntervals = 20
    const interval = rollDuration / rollIntervals

    for (let i = 0; i < rollIntervals; i++) {
        await new Promise(resolve => setTimeout(resolve, interval))
        currentFace.value = Math.floor(Math.random() * props.facets) + 1
    }
    finishedRolling.value = true;
    logResult()
}

watch(() => props.isRolling, (newVal) => {
    if (newVal) {
        roll()
    }
})
</script>

<style scoped>
.dice-container {
    display: flex;
}

.dice-display {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dice-icon {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    color: white;
    opacity: 0.6;
}

.d4 { background-image: url('@/assets/d4.png'); background-size: cover; border-width: 0px; }
.d6 { background-image: url('@/assets/d6.png'); background-size: cover; border-width: 0px }
.d8 { background-image: url('@/assets/d8.png'); background-size: cover; border-width: 0px }
.d10 { background-image: url('@/assets/d10.png'); background-size: cover; border-width: 0px }
.d12 { background-image: url('@/assets/d12.png'); background-size: cover; border-width: 0px }
.d20 { background-image: url('@/assets/d20.png'); background-size: cover; border-width: 0px }

.dice-rolling {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dice-3d {
    width: 80px;
    height: 80px;
    perspective: 1000px;
    animation: roll 0.6s;
}

.dice-face {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    color: white;
}

.dice-face.finished {
    text-shadow:
        -2px -2px 0 #000,
        2px -2px 0 #000,
        -2px 2px 0 #000,
        2px 2px 0 #000,
        -3px 0px 0 #000,
        3px 0px 0 #000,
        0px -3px 0 #000,
        0px 3px 0 #000;
}

@keyframes roll {
    0% { transform: rotateX(0deg) rotateY(0deg); }
    100% { transform: rotateX(720deg) rotateY(720deg); }
}
</style>