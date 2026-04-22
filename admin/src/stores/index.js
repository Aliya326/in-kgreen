
import { ref } from 'vue'
import { defineStore } from 'pinia'

function initState(){
  return {
    isCollapse:false
  }
}

export const useAllDataStore = defineStore('alldata',()=>{
  const state = ref(initState());
  return {
    state
  }
}) 