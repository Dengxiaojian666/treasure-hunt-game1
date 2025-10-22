import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Panorama from './views/Panorama.vue'
import Library from './views/Library.vue'
import Temple from './views/Temple.vue'
import Treasure from './views/Treasure.vue'
import Rank from './views/Rank.vue'

// 路由配置（只保留必要页面）
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/panorama', component: Panorama },
    { path: '/library', component: Library },
    { path: '/temple', component: Temple },
    { path: '/treasure', component: Treasure },
    { path: '/rank', component: Rank }
  ]
})

// 极简状态管理（直接用localStorage）
const store = {
  // 保存进度（1-5级）
  saveStep(step) {
    const current = this.getStep()
    if (step > current) localStorage.setItem('step', step)
  },
  getStep() {
    return Number(localStorage.getItem('step') || 0)
  },
  // 保存用户
  saveUser(name) {
    localStorage.setItem('user', name)
  },
  getUser() {
    return localStorage.getItem('user') || ''
  },
  // 排行榜
  addRank(time) {
    const rank = JSON.parse(localStorage.getItem('rank') || '[]')
    rank.push({ user: this.getUser(), time, date: new Date().toLocaleString() })
    localStorage.setItem('rank', JSON.stringify(rank.sort((a, b) => a.time - b.time).slice(0, 5)))
  },
  getRank() {
    return JSON.parse(localStorage.getItem('rank') || '[]')
  }
}

// 全局挂载
const app = createApp(App)
app.use(router)
app.config.globalProperties.$store = store
app.mount('#app')