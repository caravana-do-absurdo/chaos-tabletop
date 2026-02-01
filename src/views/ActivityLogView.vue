<template>
    <div class="log-container">
        <div class="log-content">
            <div v-for="(log, index) in [...logStore.log].reverse()" :key="index" class="log-line">
                {{ log }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLogStore } from '@/stores/log'

const logStore = useLogStore()
</script>

<style scoped>
.log-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 350px;
    height: 200px;
    background-color: rgb(0, 0, 0);
    border: 1px solid #444444;
    border-radius: 4px;
    overflow: hidden;
    z-index: 1000;
    display: flex;
    flex-direction: column;
}

.log-content {
    overflow-y: auto;
    flex: 1;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #0f0;
    display: flex;
    flex-direction: column-reverse;
}

.log-line {
    margin-bottom: 4px;
    word-wrap: break-word;
}

@media (max-width: 768px) {
    .log-container {
        display: none;
    }
}
</style>
