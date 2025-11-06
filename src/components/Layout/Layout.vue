<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <Header />
    
    <!-- 主内容区域 -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition 
          name="page" 
          mode="out-in"
          @enter="onPageEnter"
          @leave="onPageLeave"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-3 mb-4 md:mb-0">
            <div class="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <span class="text-lg font-semibold text-gray-900 dark:text-white">Avider.Top</span>
          </div>
          
          <div class="flex space-x-6">
            <a href="#" class="text-gray-500 hover:text-primary-500 transition-colors duration-200">
              关于我们
            </a>
            <a href="#" class="text-gray-500 hover:text-primary-500 transition-colors duration-200">
              联系方式
            </a>
            <a href="#" class="text-gray-500 hover:text-primary-500 transition-colors duration-200">
              隐私政策
            </a>
          </div>
          
          <div class="mt-4 md:mt-0 text-sm text-gray-500">
            © 2024 Avider.Top. 保留所有权利。
          </div>
        </div>
      </div>
    </footer>
    
    <!-- 回到顶部按钮 -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 z-40"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './Header.vue'

const showBackToTop = ref(false)

const onPageEnter = (el: Element) => {
  // 页面进入动画
  el.classList.add('page-enter-active')
}

const onPageLeave = (el: Element) => {
  // 页面离开动画
  el.classList.add('page-leave-active')
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.page-enter-active {
  animation: pageEnter 0.3s ease-out;
}

.page-leave-active {
  animation: pageLeave 0.2s ease-in;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pageLeave {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>