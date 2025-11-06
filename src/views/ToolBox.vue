<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          极客工具箱
        </h1>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          网页端线刷工具、ADB信息获取等实用工具集合
        </p>
      </div>

      <!-- 工具分类导航 -->
      <div class="flex flex-wrap gap-2 justify-center mb-8">
        <button 
          v-for="category in toolCategories" 
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-300',
            selectedCategory === category.id 
              ? 'text-[#FFD700] bg-[rgba(255,215,0,0.1)] border border-[#FFD700]/20' 
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          ]"
        >
          <component :is="category.icon" class="w-4 h-4 mr-2 inline" />
          {{ category.name }}
        </button>
      </div>

      <!-- 工具列表 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="tool in filteredTools" 
          :key="tool.id"
          class="card-geek group hover:shadow-lg transition-all duration-300"
        >
          <div class="p-6">
            <!-- 工具图标和标题 -->
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <component :is="tool.icon" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
              {{ tool.name }}
            </h3>
                <span class="text-xs text-primary-500 font-medium">
                  {{ tool.category }}
                </span>
              </div>
            </div>

            <!-- 工具描述 -->
            <p class="text-gray-600 text-sm mb-4">
              {{ tool.description }}
            </p>

            <!-- 工具状态 -->
            <div class="flex items-center justify-between mb-4">
              <span 
                :class="[
                  'px-2 py-1 text-xs font-medium rounded',
                  tool.status === 'available' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : tool.status === 'beta' 
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                ]"
              >
                {{ getStatusText(tool.status) }}
              </span>
              <span class="text-xs text-gray-500">
                {{ tool.version }}
              </span>
            </div>

            <!-- 操作按钮 -->
            <button 
              @click="openTool(tool)"
              :class="[
                'w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200',
                tool.status === 'available' 
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : tool.status === 'beta'
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
              :disabled="tool.status === 'planned'"
            >
              {{ getButtonText(tool.status) }}
            </button>
          </div>
        </div>
      </div>

      <!-- 线刷工具界面 -->
      <div v-if="activeTool && activeTool.id === 'flash-tool'" class="mt-8">
        <div class="card-geek">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                网页端线刷工具
              </h3>
              <button 
                @click="activeTool = null"
                class="text-gray-500 hover:text-gray-700"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="p-6">
            <!-- 连接状态 -->
            <div class="mb-6">
              <div class="flex items-center space-x-3 mb-4">
                <div 
                  :class="[
                    'w-3 h-3 rounded-full',
                    connectionStatus === 'connected' ? 'bg-green-500' :
                    connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                    'bg-red-500'
                  ]"
                ></div>
                <span class="text-sm font-medium text-gray-700">
                  {{ getConnectionStatusText() }}
                </span>
              </div>

              <div class="grid md:grid-cols-3 gap-4 mb-4">
                <button 
                  @click="connectDevice"
                  class="btn-geek"
                  :disabled="connectionStatus === 'connecting'"
                >
                  <RefreshCw class="w-4 h-4 mr-2" :class="{ 'animate-spin': connectionStatus === 'connecting' }" />
                  连接设备
                </button>
                <button 
                  @click="selectFirmware"
                  class="btn-geek"
                  :disabled="!selectedFirmware"
                >
                  <Upload class="w-4 h-4 mr-2" />
                  选择固件
                </button>
                <button 
                  @click="startFlash"
                  class="btn-geek"
                  :disabled="connectionStatus !== 'connected' || !selectedFirmware"
                >
                  <Play class="w-4 h-4 mr-2" />
                  开始刷机
                </button>
              </div>
            </div>

            <!-- 进度显示 -->
            <div v-if="flashProgress > 0" class="mb-6">
              <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>刷机进度</span>
                <span>{{ flashProgress }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: flashProgress + '%' }"
                ></div>
              </div>
            </div>

            <!-- 日志输出 -->
            <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-48 overflow-y-auto">
              <div v-for="(log, index) in flashLogs" :key="index" class="mb-1">
                > {{ log }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ADB信息获取界面 -->
      <div v-if="activeTool && activeTool.id === 'adb-info'" class="mt-8">
        <div class="card-geek">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                ADB设备信息获取
              </h3>
              <button 
                @click="activeTool = null"
                class="text-gray-500 hover:text-gray-700"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="p-6">
            <!-- 设备信息 -->
            <div v-if="deviceInfo" class="grid md:grid-cols-2 gap-6 mb-6">
              <div v-for="(value, key) in deviceInfo" :key="key" class="bg-gray-50 p-3 rounded">
                <div class="text-sm text-gray-500 capitalize">{{ key }}</div>
                <div class="text-sm font-medium text-gray-900">{{ value }}</div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex space-x-4">
              <button @click="getDeviceInfo" class="btn-geek">
                <RefreshCw class="w-4 h-4 mr-2" />
                获取设备信息
              </button>
              <button @click="clearInfo" class="btn-geek">
                <Trash2 class="w-4 h-4 mr-2" />
                清空信息
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Wrench, Smartphone, Monitor, Cpu, Database, Code, Upload, Play, RefreshCw, X, Trash2 } from 'lucide-vue-next'

interface Tool {
  id: string
  name: string
  category: string
  description: string
  icon: any
  status: 'available' | 'beta' | 'planned'
  version: string
}

const selectedCategory = ref('all')
const activeTool = ref<Tool | null>(null)

const toolCategories = [
    { id: 'all', name: '全部', icon: Wrench },
    { id: 'mobile', name: '移动端', icon: Smartphone },
    { id: 'desktop', name: '桌面端', icon: Monitor },
    { id: 'system', name: '系统工具', icon: Cpu },
    { id: 'network', name: '网络工具', icon: Database },
    { id: 'development', name: '开发工具', icon: Code }
  ]

const tools: Tool[] = [
  {
    id: 'flash-tool',
    name: '网页端线刷工具',
    category: '手机工具',
    description: '支持多种设备的网页端线刷操作，提供可视化刷机流程',
    icon: Upload,
    status: 'beta',
    version: 'v1.0-beta'
  },
  {
    id: 'adb-info',
    name: 'ADB信息获取',
    category: '手机工具',
    description: '通过ADB连接获取安卓设备的详细信息',
    icon: Smartphone,
    status: 'available',
    version: 'v1.2'
  },
  {
    id: 'system-info',
    name: '系统信息检测',
    category: '系统工具',
    description: '检测当前设备的硬件和系统信息',
    icon: Cpu,
    status: 'available',
    version: 'v1.1'
  },
  {
    id: 'file-converter',
    name: '文件格式转换',
    category: '数据工具',
    description: '支持多种文件格式的在线转换工具',
    icon: Database,
    status: 'planned',
    version: 'v0.1'
  },
  {
    id: 'code-formatter',
    name: '代码格式化',
    category: '开发工具',
    description: '支持多种编程语言的代码格式化工具',
    icon: Code,
    status: 'planned',
    version: 'v0.1'
  },
  {
    id: 'network-tools',
    name: '网络工具集',
    category: '系统工具',
    description: 'Ping、端口扫描等网络诊断工具',
    icon: Monitor,
    status: 'planned',
    version: 'v0.1'
  }
]

const filteredTools = computed(() => {
  if (selectedCategory.value === 'all') {
    return tools
  }
  return tools.filter(tool => tool.category === selectedCategory.value)
})

// 线刷工具相关状态
const connectionStatus = ref<'disconnected' | 'connecting' | 'connected'>('disconnected')
const selectedFirmware = ref<string | null>(null)
const flashProgress = ref(0)
const flashLogs = ref<string[]>([])

// ADB工具相关状态
const deviceInfo = ref<Record<string, string> | null>(null)

const getStatusText = (status: string) => {
  const statusMap = {
    'available': '可用',
    'beta': '测试版',
    'planned': '计划中'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const getButtonText = (status: string) => {
  const buttonTextMap = {
    'available': '立即使用',
    'beta': '试用',
    'planned': '敬请期待'
  }
  return buttonTextMap[status as keyof typeof buttonTextMap] || status
}

const openTool = (tool: Tool) => {
  activeTool.value = tool
  
  // 重置工具状态
  if (tool.id === 'flash-tool') {
    connectionStatus.value = 'disconnected'
    selectedFirmware.value = null
    flashProgress.value = 0
    flashLogs.value = []
  } else if (tool.id === 'adb-info') {
    deviceInfo.value = null
  }
}

// 线刷工具方法
const connectDevice = () => {
  connectionStatus.value = 'connecting'
  flashLogs.value.push('正在连接设备...')
  
  // 模拟连接过程
  setTimeout(() => {
    connectionStatus.value = 'connected'
    flashLogs.value.push('设备连接成功!')
  }, 2000)
}

const selectFirmware = () => {
  // 模拟选择固件
  selectedFirmware.value = 'miui_redmi_note12_turbo_v14.0.1.zip'
  flashLogs.value.push(`已选择固件: ${selectedFirmware.value}`)
}

const startFlash = () => {
  if (connectionStatus.value !== 'connected' || !selectedFirmware.value) return
  
  flashLogs.value.push('开始刷机过程...')
  
  // 模拟刷机进度
  const interval = setInterval(() => {
    flashProgress.value += Math.random() * 10
    flashLogs.value.push(`刷机进度: ${Math.round(flashProgress.value)}%`)
    
    if (flashProgress.value >= 100) {
      clearInterval(interval)
      flashLogs.value.push('刷机完成!')
    }
  }, 1000)
}

const getConnectionStatusText = () => {
  const statusMap = {
    'disconnected': '设备未连接',
    'connecting': '正在连接...',
    'connected': '设备已连接'
  }
  return statusMap[connectionStatus.value]
}

// ADB工具方法
const getDeviceInfo = () => {
  // 模拟获取设备信息
  deviceInfo.value = {
    '设备型号': 'Redmi Note 12 Turbo',
    'Android版本': '13',
    'MIUI版本': '14.0.1',
    '处理器': 'Snapdragon 7+ Gen 2',
    '内存': '12GB',
    '存储': '256GB',
    '分辨率': '2400x1080',
    '电池容量': '5000mAh'
  }
}

const clearInfo = () => {
  deviceInfo.value = null
}
</script>