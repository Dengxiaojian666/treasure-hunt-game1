<template>
  <div>
    <h1>图书馆</h1>
    <button @click="$router.push('/panorama')">返回</button>
    
    <div style="display: flex; gap: 20px; margin: 20px 0;">
      <img src="/images/library.jpg" style="width: 60%; height: 300px; object-fit: cover;" />
      
      <div>
        <p :style="step >=1 ? 'color: green' : ''">1. 找到线索</p>
        <p :style="step >=2 ? 'color: green' : ''">2. 解读线索</p>
        <button @click="complete" :disabled="step >=2">探索</button>
        <p>{{ hint }}</p>
      </div>
    </div>
    
    <audio ref="audio" loop src="/music/library.mp3" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const step = proxy.$store.getStep()
const hint = ref('点击探索开始任务')
const audio = ref(null)

const complete = () => {
  if (step < 1) {
    hint.value = '找到一张地图碎片！'
    proxy.$store.saveStep(1)
  } else if (step < 2) {
    hint.value = '线索指向神庙！'
    proxy.$store.saveStep(2)
  }
}

onMounted(() => {
  if (localStorage.getItem('music') !== 'off') audio.value.play().catch(() => {})
})
</script>