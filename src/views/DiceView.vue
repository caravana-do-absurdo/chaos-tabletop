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

const diceTypes = ref<Array<DiceNumbers>>([20, 12, 10, 8, 6, 4]);
const dicesToRoll = ref<Array<DiceNumbers>>([]);
const rollAllDice = ref(false)

const createDice = (facets: DiceNumbers) => {
    dicesToRoll.value.push(facets)
};

const reset = () => {
    dicesToRoll.value = [];
    rollAllDice.value = false;
}

</script>

<style scoped>
.dice-area {
    position: fixed;
    width: 50%;
    height: 50vh;
    bottom: 100px;
    right: 24px;
    background-color: white;
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
    height: 32px;
}

button {
    padding: 8px 16px;
    border: 0px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    margin: 0px 2px 0px 0px;
}

.roll-button {
    float: inline-end;
    font-weight: bold;
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
</style>