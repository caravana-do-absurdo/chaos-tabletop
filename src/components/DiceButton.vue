<template>
    <button
        class="fab-button"
        :class="{ 'fab-button-active': showDiceView }"
        @click="toggleDiceView"
        aria-label="Toggle dice roller"
    >
        <span class="dice-icon">{{ showDiceView ? '⬇️' : '🎲' }}</span>
    </button>

    <DiceView v-if="showDiceView" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DiceView from '../views/DiceView.vue';

const showDiceView = ref(false);

const toggleDiceView = () => {
    showDiceView.value = !showDiceView.value;
};
</script>

<style scoped>
.fab-button {
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #7c3aed;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 100;
}

.fab-button:hover {
    background-color: #5c17c8;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.fab-button-active {
    background-color: #d3d3d3;
}

.fab-button-active:hover {
    background-color: #a9a9a9;
}

.dice-icon {
    font-size: 28px;
}
</style>