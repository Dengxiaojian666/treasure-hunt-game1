<template>
  <div>
    <h1>神庙</h1>
    <button @click="$router.push('/panorama')">返回</button>
    
    <div style="display: flex; gap: 20px; margin: 20px 0;">
      <img src="/images/temple.jpg" style="width: 60%; height: 300px; object-fit: cover;" />
      
      <div>
        <p :style="step >=3 ? 'color: green' : ''">3. 找到密室</p>
        <p :style="step >=4 ? 'color: green' : ''">4. 破解机关</p>
        <button @click="complete" :disabled="step >=4 || step < 2">探索</button>
        <p>{{ hint }}</p>
      </div>
    </div>
    
    <audio ref="audio" loop src="/music/temple.mp3" />
  </div> 
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const step = proxy.$store.getStep()
const hint = ref(step < 2 ? '先去图书馆获取线索！' : '点击探索开始任务')
const audio = ref(null)

const complete = () => {
  if (step < 3) {
    hint.value = '密室在神像后面！'
    proxy.$store.saveStep(3)
  } else if (step < 4) {
    hint.value = '机关破解，宝箱出现！'
    proxy.$store.saveStep(4)
  }
}

onMounted(() => {
  if (localStorage.getItem('music') !== 'off') audio.value.play().catch(() => {})
})
</script>