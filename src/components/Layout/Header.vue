<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">Avider.Top</span>
        </div>

        <!-- 导航菜单 -->
        <nav class="hidden md:flex space-x-8">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            active-class="active"
          >
            <component :is="item.icon" class="w-4 h-4 mr-2" />
            {{ item.name }}
          </router-link>
        </nav>

        <!-- 右侧操作区 -->
        <div class="flex items-center space-x-4">
          <!-- 移动端菜单按钮 -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700">
        <div class="py-2 space-y-1">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            @click="isMobileMenuOpen = false"
          >
            <component :is="item.icon" class="w-4 h-4 mr-3" />
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  Home, 
  Smartphone, 
  Monitor, 
  Music, 
  Wrench,
  Menu 
} from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/', icon: Home },
  { name: '安卓刷机', path: '/android', icon: Smartphone },
  { name: '电脑装机', path: '/windows', icon: Monitor },
  { name: '音乐播放器', path: '/music', icon: Music },
  { name: '工具箱', path: '/toolbox', icon: Wrench },
]
</script>