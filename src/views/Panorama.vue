<template>
  <div>
    <h1>全景地图</h1>
    <button @click="$router.push('/rank')">排行榜</button>
    
    <!-- 全景背景 + 可点击地点 -->
    <div style="position: relative; width: 100%; height: 400px; background: url('/images/panorama.jpg') center/cover; margin: 20px 0;">
      <!-- 图书馆 -->
      <div @click="$router.push('/library')" style="position: absolute; top: 30%; left: 25%; text-align: center;">
        <div :style="step >=1 ? 'background: green' : 'background: red'" style="width: 20px; height: 20px; border-radius: 50%; margin: 0 auto;"></div>
        <span style="background: white; padding: 2px 8px; border-radius: 4px;">图书馆</span>
      </div>
      
      <!-- 神庙 -->
      <div @click="$router.push('/temple')" style="position: absolute; top: 50%; left: 60%; text-align: center;">
        <div :style="step >=2 ? 'background: green' : 'background: red'" style="width: 20px; height: 20px; border-radius: 50%; margin: 0 auto;"></div>
        <span style="background: white; padding: 2px 8px; border-radius: 4px;">神庙</span>
      </div>
      
      <!-- 宝藏点 -->
      <div @click="$router.push('/treasure')" style="position: absolute; top: 70%; left: 40%; text-align: center;">
        <div :style="step >=3 ? 'background: green' : 'background: red'" style="width: 20px; height: 20px; border-radius: 50%; margin: 0 auto;"></div>
        <span style="background: white; padding: 2px 8px; border-radius: 4px;">宝藏点</span>
      </div>
    </div>
    
    <!-- 音乐控制 -->
    <button @click="toggleMusic" style="position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; border-radius: 50%;">
      {{ playing ? '🔊' : '🔇' }}
    </button>
    <audio ref="audio" loop src="/music/panorama.mp3" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const step = proxy.$store.getStep()
const audio = ref(null)
const playing = ref(localStorage.getItem('music') !== 'off')

const toggleMusic = () => {
  playing.value = !playing.value
  playing.value ? audio.value.play() : audio.value.pause()
  localStorage.setItem('music', playing.value ? 'on' : 'off')
}

onMounted(() => playing.value && audio.value.play().catch(() => {}))
</script>