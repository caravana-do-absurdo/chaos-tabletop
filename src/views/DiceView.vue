<template>
    <div class="dice-area">
        <div class="dice-area-wrapper">
            <div class="buttons-wrapper">        
                <button :class="`d${dice}`" v-for="dice in diceTypes" :key="dice" @click="createDice(dice)">
                    d{{ dice }}
                </button>
                <button class="roll-button" @click="rollAllDice = true" v-if="!rollAllDice">Roll</button>
                <button class="reset-button" @click="reset()" v-if="rollAllDice">Reset</button>
            </div>

            <div class="dice-grid">
                <BaseDice v-for="(dice, index) in dicesToRoll" :key="index" :facets="dice" :isRolling="rollAllDice" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseDice from '@/components/BaseDice.vue'
import { DiceNumbers } from '@/types';
import { useLogStore } from '@/stores/log';

const { addLogMsg } = useLogStore()
const diceTypes = ref<Array<DiceNumbers>>([20, 12, 10, 8, 6, 4]);
const dicesToRoll = ref<Array<DiceNumbers>>([]);
const rollAllDice = ref(false)

const logReset = () => {
    addLogMsg(`---- DICE RESET ----`)
}


const reset = () => {
    logReset();
    dicesToRoll.value = [];
    rollAllDice.value = false;
}

const createDice = (facets: DiceNumbers) => {
    if(rollAllDice.value) {
        reset();
    }
    dicesToRoll.value.push(facets)
};

</script>

<style scoped>
.dice-area {
    position: fixed;
    width: 30%;
    height: 50vh;
    bottom: 100px;
    right: 24px;
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

.dice-area-wrapper {
    width: 100%;
}

.buttons-wrapper {
    display: inline-block;
    width: 100%;
}

button {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    background-color: transparent;
    margin: 0px 2px 0px 0px;
}

.roll-button {
    float: inline-end;
    font-weight: bold;
    color: white;
    background-color: #5c17c8;
}

.reset-button {
    background-color: #ccc;
    float: inline-end;
    font-weight: bold;
}

.dice-grid {
    margin: 10px 0px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
}

@media (max-width: 768px) {
    .dice-area {
        width: calc(100% - 48px);
        height: calc(100% - 100px - 32px);
        bottom: 100px;
        right: 24px;
    }

    button {
        width: calc(50% - 4px);
        padding: 12px 0px;
        margin: 2px;
    }

    .roll-button,
    .reset-button {
        width: 100%;
    }
}
</style>