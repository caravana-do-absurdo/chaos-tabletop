import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLogStore = defineStore('log', () => {
  const log = ref<Array<string>>([])
  function addLogMsg(logMsg: string) {
    log.value.push(logMsg)
  }

  return { log, addLogMsg }
})
