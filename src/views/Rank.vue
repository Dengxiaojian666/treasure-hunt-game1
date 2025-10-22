<template>
  <div>
    <h1>排行榜</h1>
    <button @click="$router.push('/panorama')">返回</button>
    
    <div style="margin: 20px 0; background: white; padding: 20px; border-radius: 8px;">
      <div v-for="(item, i) in rank" :key="i" style="padding: 10px; border-bottom: 1px solid #eee;">
        <span style="display: inline-block; width: 50px;">{{i+1}}.</span>
        <span style="display: inline-block; width: 150px;">{{item.user}}</span>
        <span style="display: inline-block; width: 100px;">{{item.time}}秒</span>
        <span>{{item.date}}</span>
      </div>
      <div v-if="rank.length ===0">暂无记录</div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const rank = proxy.$store.getRank()
</script>