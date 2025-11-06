<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          电脑装机配置
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          提供不同价位的装机配置推荐，支持性能、价格等多维度排序和筛选
        </p>
      </div>

      <!-- 控制面板 -->
      <div class="card-geek p-6 mb-8">
        <div class="grid md:grid-cols-4 gap-4">
          <!-- 价格筛选 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              价格区间
            </label>
            <select 
              v-model="selectedPriceRange" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">全部</option>
              <option value="budget">入门级 (¥2000-4000)</option>
              <option value="mid">中端 (¥4000-8000)</option>
              <option value="high">高端 (¥8000-15000)</option>
              <option value="enthusiast">发烧级 (¥15000+)</option>
            </select>
          </div>

          <!-- 用途筛选 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              主要用途
            </label>
            <select 
              v-model="selectedUsage" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">全部</option>
              <option value="office">办公学习</option>
              <option value="gaming">游戏娱乐</option>
              <option value="design">设计创作</option>
              <option value="programming">编程开发</option>
            </select>
          </div>

          <!-- 排序方式 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              排序方式
            </label>
            <select 
              v-model="sortBy" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="price">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="performance">性能评分</option>
              <option value="popularity">热门程度</option>
            </select>
          </div>

          <!-- 搜索 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              搜索配置
            </label>
            <input 
              v-model="searchQuery" 
              placeholder="搜索配置名称..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <!-- 配置列表 -->
      <div class="grid lg:grid-cols-2 gap-8">
        <div 
          v-for="config in filteredConfigs" 
          :key="config.id"
          class="card-geek group hover:scale-105 transition-transform duration-300"
        >
          <!-- 配置头部 -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ config.name }}
              </h3>
              <div class="flex items-center space-x-2">
                <span class="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded">
                  {{ config.usage }}
                </span>
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                  ¥{{ config.totalPrice.toLocaleString() }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-primary-500">{{ config.performanceScore }}</div>
                  <div class="text-xs text-gray-500">性能评分</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-semibold text-green-500">{{ config.valueScore }}</div>
                  <div class="text-xs text-gray-500">性价比</div>
                </div>
              </div>
              
              <button 
                @click="toggleConfigDetails(config.id)"
                class="text-gray-500 hover:text-primary-500 transition-colors duration-200"
              >
                <ChevronDown 
                  class="w-5 h-5 transition-transform duration-200" 
                  :class="{ 'rotate-180': expandedConfigs.includes(config.id) }" 
                />
              </button>
            </div>
          </div>

          <!-- 配置详情 -->
          <div v-if="expandedConfigs.includes(config.id)" class="p-6">
            <div class="space-y-4">
              <div v-for="component in config.components" :key="component.type" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <component :is="getComponentIcon(component.type)" class="w-5 h-5 text-primary-500" />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ component.type }}</span>
                </div>
                <div class="text-right">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ component.model }}</div>
                  <div class="text-xs text-gray-500">¥{{ component.price.toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- 配置说明 -->
            <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p class="text-sm text-blue-700 dark:text-blue-300">{{ config.description }}</p>
            </div>

            <!-- 操作按钮 -->
            <div class="mt-4 flex space-x-3">
              <button class="btn-geek flex-1">
                <ShoppingCart class="w-4 h-4 mr-2" />
                一键购买
              </button>
              <button class="btn-geek flex-1">
                <Share2 class="w-4 h-4 mr-2" />
                分享配置
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredConfigs.length === 0" class="text-center py-12">
        <Monitor class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400">
          暂无符合条件的装机配置
        </p>
      </div>

      <!-- 排行榜 -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">配置排行榜</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <!-- 性能排行榜 -->
          <div class="card-geek p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Zap class="w-5 h-5 text-yellow-500 mr-2" />
              性能排行榜
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(config, index) in performanceRanking" 
                :key="config.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ config.name }}
                  </span>
                </div>
                <span class="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  {{ config.performanceScore }}
                </span>
              </div>
            </div>
          </div>

          <!-- 性价比排行榜 -->
          <div class="card-geek p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp class="w-5 h-5 text-green-500 mr-2" />
              性价比排行榜
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(config, index) in valueRanking" 
                :key="config.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ config.name }}
                  </span>
                </div>
                <span class="text-sm text-green-600 dark:text-green-400 font-medium">
                  {{ config.valueScore }}
                </span>
              </div>
            </div>
          </div>

          <!-- 热门配置 -->
          <div class="card-geek p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Flame class="w-5 h-5 text-red-500 mr-2" />
              热门配置
            </h3>
            <div class="space-y-3">
              <div 
                v-for="(config, index) in popularityRanking" 
                :key="config.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {{ index + 1 }}
                  </div>
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                    {{ config.name }}
                  </span>
                </div>
                <span class="text-sm text-red-600 dark:text-red-400 font-medium">
                  {{ config.popularity }}
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
import { ref, computed } from 'vue'
import { 
  Monitor, Cpu, HardDrive, Monitor as Display, 
  Zap, TrendingUp, Flame, ShoppingCart, Share2, ChevronDown 
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

const selectedPriceRange = ref('all')
const selectedUsage = ref('all')
const sortBy = ref('performance')
const searchQuery = ref('')
const expandedConfigs = ref<string[]>([])

const pcConfigs: PcConfig[] = [
  {
    id: 'budget-gaming',
    name: '入门游戏配置',
    usage: '游戏娱乐',
    totalPrice: 3500,
    performanceScore: 75,
    valueScore: 8.5,
    popularity: 95,
    description: '性价比极高的入门级游戏配置，适合主流网游和轻度单机游戏',
    components: [
      { type: 'CPU', model: 'Intel i3-12100F', price: 800 },
      { type: '显卡', model: 'GTX 1650', price: 1200 },
      { type: '内存', model: '16GB DDR4', price: 300 },
      { type: '硬盘', model: '512GB NVMe SSD', price: 300 },
      { type: '主板', model: 'H610', price: 500 },
      { type: '显示器', model: '24寸 1080P', price: 500 }
    ]
  },
  {
    id: 'mid-gaming',
    name: '中端游戏配置',
    usage: '游戏娱乐',
    totalPrice: 6500,
    performanceScore: 88,
    valueScore: 7.8,
    popularity: 85,
    description: '平衡性能与价格的中端配置，畅玩主流3A大作',
    components: [
      { type: 'CPU', model: 'AMD Ryzen 5 5600X', price: 1200 },
      { type: '显卡', model: 'RTX 3060', price: 2500 },
      { type: '内存', model: '16GB DDR4 3200MHz', price: 400 },
      { type: '硬盘', model: '1TB NVMe SSD', price: 500 },
      { type: '主板', model: 'B550', price: 700 },
      { type: '显示器', model: '27寸 2K 144Hz', price: 1200 }
    ]
  },
  {
    id: 'high-end-gaming',
    name: '高端游戏配置',
    usage: '游戏娱乐',
    totalPrice: 12000,
    performanceScore: 95,
    valueScore: 6.5,
    popularity: 75,
    description: '顶级游戏体验配置，支持4K高帧率游戏',
    components: [
      { type: 'CPU', model: 'Intel i7-13700K', price: 2800 },
      { type: '显卡', model: 'RTX 4070 Ti', price: 5500 },
      { type: '内存', model: '32GB DDR5 5600MHz', price: 900 },
      { type: '硬盘', model: '2TB NVMe SSD', price: 900 },
      { type: '主板', model: 'Z790', price: 1500 },
      { type: '显示器', model: '32寸 4K 144Hz', price: 2400 }
    ]
  },
  {
    id: 'office-setup',
    name: '办公学习配置',
    usage: '办公学习',
    totalPrice: 2800,
    performanceScore: 65,
    valueScore: 9.0,
    popularity: 80,
    description: '稳定可靠的办公学习配置，满足日常使用需求',
    components: [
      { type: 'CPU', model: 'AMD Ryzen 5 5600G', price: 1000 },
      { type: '内存', model: '16GB DDR4', price: 300 },
      { type: '硬盘', model: '512GB SSD', price: 300 },
      { type: '主板', model: 'A520', price: 400 },
      { type: '显示器', model: '23.8寸 1080P', price: 800 }
    ]
  }
]

const filteredConfigs = computed(() => {
  let filtered = pcConfigs

  // 价格筛选
  if (selectedPriceRange.value !== 'all') {
    filtered = filtered.filter(config => {
      switch (selectedPriceRange.value) {
        case 'budget': return config.totalPrice >= 2000 && config.totalPrice <= 4000
        case 'mid': return config.totalPrice > 4000 && config.totalPrice <= 8000
        case 'high': return config.totalPrice > 8000 && config.totalPrice <= 15000
        case 'enthusiast': return config.totalPrice > 15000
        default: return true
      }
    })
  }

  // 用途筛选
  if (selectedUsage.value !== 'all') {
    filtered = filtered.filter(config => config.usage === selectedUsage.value)
  }

  // 搜索筛选
  if (searchQuery.value) {
    filtered = filtered.filter(config => 
      config.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      config.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // 排序
  return [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'price': return a.totalPrice - b.totalPrice
      case 'price-desc': return b.totalPrice - a.totalPrice
      case 'performance': return b.performanceScore - a.performanceScore
      case 'popularity': return b.popularity - a.popularity
      default: return 0
    }
  })
})

const performanceRanking = computed(() => 
  [...pcConfigs].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5)
)

const valueRanking = computed(() => 
  [...pcConfigs].sort((a, b) => b.valueScore - a.valueScore).slice(0, 5)
)

const popularityRanking = computed(() => 
  [...pcConfigs].sort((a, b) => b.popularity - a.popularity).slice(0, 5)
)

const toggleConfigDetails = (configId: string) => {
  const index = expandedConfigs.value.indexOf(configId)
  if (index > -1) {
    expandedConfigs.value.splice(index, 1)
  } else {
    expandedConfigs.value.push(configId)
  }
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