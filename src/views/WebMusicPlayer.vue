<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          音乐播放器
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          在线音乐播放体验（开发中）
        </p>
      </div>

      <!-- 开发中提示 -->
      <div class="max-w-2xl mx-auto">
        <div class="card-geek p-8 text-center">
          <Music class="w-16 h-16 text-primary-500 mx-auto mb-4" />
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            功能开发中
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            音乐播放器功能正在积极开发中，敬请期待！
          </p>
          
          <!-- 功能预告 -->
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Play class="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 class="font-semibold text-gray-900 dark:text-white">在线播放</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">支持多种音频格式</p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <ListMusic class="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 class="font-semibold text-gray-900 dark:text-white">播放列表</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">自定义歌单管理</p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Search class="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 class="font-semibold text-gray-900 dark:text-white">音乐搜索</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">快速查找想听的歌曲</p>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Heart class="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <h3 class="font-semibold text-gray-900 dark:text-white">收藏功能</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">标记喜欢的音乐</p>
            </div>
          </div>

          <!-- 进度指示 -->
          <div class="mb-6">
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>开发进度</span>
              <span>25%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="bg-primary-500 h-2 rounded-full w-1/4"></div>
            </div>
          </div>

          <button class="btn-geek opacity-50 cursor-not-allowed" disabled>
            <Clock class="w-4 h-4 mr-2" />
            敬请期待
          </button>
        </div>
      </div>

      <!-- 技术栈预告 -->
      <div class="mt-12 text-center">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          计划使用的技术栈
        </h3>
        <div class="flex flex-wrap justify-center gap-3">
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
            Web Audio API
          </span>
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm rounded-full">
            Vue 3 Composition API
          </span>
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full">
            IndexedDB
          </span>
          <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-sm rounded-full">
            PWA 支持
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Music, Play, ListMusic, Search, Heart, Clock } from 'lucide-vue-next'
</script>