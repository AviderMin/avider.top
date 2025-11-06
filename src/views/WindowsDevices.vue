<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          电脑装机配置
        </h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          提供不同价位的装机配置推荐，支持性能、价格等多维度排序和筛选
        </p>
      </div>



      <!-- 加载状态 -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-600">正在加载配置数据...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="flex flex-col items-center">
          <svg class="w-12 h-12 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="text-lg font-medium text-red-800 mb-2">加载失败</h3>
          <p class="text-red-700 mb-4">{{ error }}</p>
          <button 
            @click="fetchConfigs()"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            重试
          </button>
        </div>
      </div>

      <!-- 配置列表 -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="config in filteredConfigs" 
          :key="config.id"
          class="card-geek p-6 transition-all duration-300 hover:shadow-lg"
        >
          <!-- 配置标题和用途 -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white truncate">
              {{ config.name }}
            </h3>
            <span class="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded">
              {{ config.usage }}
            </span>
          </div>
          
          <!-- 评分信息 -->
          <div class="flex justify-center space-x-6 mb-4">
            <div class="text-center">
              <div class="text-xl font-bold text-primary-500">{{ config.performanceScore }}</div>
              <div class="text-xs text-gray-500">性能评分</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-green-500">{{ config.valueScore }}</div>
              <div class="text-xs text-gray-500">性价比</div>
            </div>
          </div>
          
          <!-- 完整硬件组件 -->
          <div class="space-y-2 mb-4">
            <div v-for="componentType in ['CPU', '显卡', '主板', '内存', '硬盘', '散热器', '电源', '机箱']" :key="componentType">
              <div v-if="config.components.find(c => c.type === componentType)" class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-2">
                  <component :is="getComponentIcon(componentType)" class="w-4 h-4 text-primary-500" />
                  <span class="text-gray-600 dark:text-gray-300">{{ componentType }}</span>
                </div>
                <span class="font-medium text-gray-900 dark:text-white">{{ config.components.find(c => c.type === componentType)?.model }}</span>
              </div>
            </div>
          </div>
          
          <!-- 配置介绍 -->
          <div class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ config.description }}
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && !error && filteredConfigs.length === 0" class="text-center py-12">
        <Monitor class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400">
          暂无符合条件的装机配置
        </p>
      </div>

      <!-- 硬件排行榜 -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">硬件排行榜</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Intel CPU排行榜 -->
          <div class="card-geek p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Cpu class="w-5 h-5 text-blue-500 mr-2" />
              Intel CPU榜
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(config, index) in rankings.intelCpu" 
                :key="config.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ config.model }}
                  </span>
                </div>
                <span class="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  ¥{{ config.price.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>

          <!-- AMD CPU排行榜 -->
          <div class="card-geek p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Cpu class="w-5 h-5 text-red-500 mr-2" />
              AMD CPU榜
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(config, index) in rankings.amdCpu" 
                :key="config.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ config.model }}
                  </span>
                </div>
                <span class="text-sm text-red-600 dark:text-red-400 font-medium">
                  ¥{{ config.price.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>

          <!-- NVIDIA显卡排行榜 -->
          <div class="card-geek p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap class="w-5 h-5 text-green-500 mr-2" />
              NVIDIA显卡榜
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(config, index) in rankings.nvidiaGpu" 
                :key="config.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ config.model }}
                  </span>
                </div>
                <span class="text-sm text-green-600 dark:text-green-400 font-medium">
                  ¥{{ config.price.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>

          <!-- AMD显卡排行榜 -->
          <div class="card-geek p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap class="w-5 h-5 text-purple-500 mr-2" />
              AMD显卡榜
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(config, index) in rankings.amdGpu" 
                :key="config.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ config.model }}
                  </span>
                </div>
                <span class="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  ¥{{ config.price.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  Monitor, Cpu, HardDrive, Monitor as Display, 
  Zap
} from 'lucide-vue-next'

interface Component {
  type: string
  model: string
  price: number
}

interface PcConfig {
  id: string
  name: string
  usage: string
  totalPrice: number
  performanceScore: number
  valueScore: number
  popularity: number
  description: string
  components: Component[]
}

interface RankingItem {
  id: string
  model: string
  score: number
  price: number
}


const pcConfigs = ref<PcConfig[]>([])
const rankings = ref<{[key: string]: RankingItem[]}>({})
const loading = ref(true)
const error = ref<string | null>(null)

// API基础URL
const API_BASE = 'http://localhost:3000/api'

// 获取配置数据
const fetchConfigs = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(`${API_BASE}/hardware/configs`)
    const result = await response.json()
    
    if (result.success) {
      pcConfigs.value = result.data
    } else {
      throw new Error(result.error || '获取配置数据失败')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '网络请求失败'
    console.error('获取配置数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 获取排行榜数据
const fetchRankings = async () => {
  try {
    const rankingTypes = ['intelCpu', 'amdCpu', 'nvidiaGpu', 'amdGpu']
    
    for (const type of rankingTypes) {
      const response = await fetch(`${API_BASE}/hardware/rankings/${type}`)
      const result = await response.json()
      
      if (result.success) {
        rankings.value[type] = result.data
      }
    }
  } catch (err) {
    console.error('获取排行榜数据失败:', err)
  }
}

const filteredConfigs = computed(() => {
  return pcConfigs.value
})



// 组件挂载时获取数据
onMounted(() => {
  fetchConfigs()
  fetchRankings()
})

// 获取Intel CPU型号
const getIntelCpuModel = (cpu: any) => {
  return cpu?.model || 'Intel CPU'
}

// 获取Intel CPU评分（基于价格）
const getIntelCpuScore = (cpu: any) => {
  return cpu?.price || 0
}

// 获取AMD CPU型号
const getAmdCpuModel = (cpu: any) => {
  return cpu?.model || 'AMD CPU'
}

// 获取AMD CPU评分（基于价格）
const getAmdCpuScore = (cpu: any) => {
  return cpu?.price || 0
}

// 获取NVIDIA显卡型号
const getNvidiaGpuModel = (gpu: any) => {
  return gpu?.model || 'NVIDIA GPU'
}

// 获取NVIDIA显卡评分（基于价格）
const getNvidiaGpuScore = (gpu: any) => {
  return gpu?.price || 0
}

// 获取AMD显卡型号
const getAmdGpuModel = (gpu: any) => {
  return gpu?.model || 'AMD GPU'
}

// 获取AMD显卡评分（基于价格）
const getAmdGpuScore = (gpu: any) => {
  return gpu?.price || 0
}

const getComponentIcon = (type: string) => {
  const iconMap: { [key: string]: any } = {
    'CPU': Cpu,
    '显卡': Zap,
    '内存': HardDrive, // 使用硬盘图标代替内存图标
    '硬盘': HardDrive,
    '主板': Cpu,
    '显示器': Display
  }
  return iconMap[type] || Cpu
}
</script>