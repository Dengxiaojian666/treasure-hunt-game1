<template>
  <div style="text-align: center; margin-top: 100px;">
    <h1>寻宝游戏</h1>
    <input 
      type="text" 
      v-model="name" 
      placeholder="输入用户名"
      style="padding: 8px; margin: 20px; width: 200px;"
    >
    <button @click="login">开始</button>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const name = ref('')

const login = () => {
  if (name.value) {
    proxy.$store.saveUser(name.value)
    proxy.$router.push('/panorama')
  }
}
</script>