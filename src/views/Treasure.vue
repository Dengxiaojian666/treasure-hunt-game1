<template>
  <div>
    <h1>宝藏点</h1>
    <button @click="$router.push('/panorama')">返回</button>
    
    <div style="display: flex; gap: 20px; margin: 20px 0;">
      <img src="/images/treasure.jpg" style="width: 60%; height: 300px; object-fit: cover;" />
      
      <div>
        <p :style="step >=5 ? 'color: green' : ''">5. 打开宝箱</p>
        <button @click="complete" :disabled="step >=5 || step <4">打开宝箱</button>
        <p>{{ hint }}</p>
      </div>
    </div>
    
    <audio ref="audio" loop src="/music/treasure.mp3" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const step = proxy.$store.getStep()
const hint = ref(step <4 ? '先去神庙破解机关！' : '点击打开宝箱')
const startTime = Date.now()
const audio = ref(null)

const complete = () => {
  if (step <5) {
    const time = Math.floor((Date.now() - startTime)/1000)
    hint.value = `找到黄金！用时${time}秒`
    proxy.$store.saveStep(5)
    proxy.$store.addRank(time)
  }
}

onMounted(() => {
  if (localStorage.getItem('music') !== 'off') audio.value.play().catch(() => {})
})
</script>