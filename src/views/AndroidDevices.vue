<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          安卓刷机资源
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          我使用的设备的刷机资源
        </p>
      </div>

      <!-- 设备筛选 -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="device in deviceTypes"
            :key="device"
            @click="selectedDevice = device; handleDeviceTypeChange()"
            :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-300',
            selectedDevice === device
              ? 'text-[#FFD700] bg-[rgba(255,215,0,0.1)]' 
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          ]"
          >
            {{ device }}
          </button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p class="mt-4 text-gray-500 dark:text-gray-400">正在加载设备数据...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-12">
        <AlertTriangle class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p class="text-red-600 dark:text-red-400 mb-2">加载失败</p>
        <p class="text-gray-500 dark:text-gray-400">{{ error }}</p>
        <button 
          @click="fetchDevices()" 
          class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          重试
        </button>
      </div>

      <!-- 设备列表 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="device in filteredDevices" :key="device.id" class="card-geek group hover:shadow-lg transition-all duration-300">
          <!-- 设备图片 -->
          <div class="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden rounded-t-lg px-4">
            <div class="absolute inset-0 bg-gradient-to-br from-gray-300/5 to-gray-400/5"></div>
            <div class="relative z-10 w-full max-w-48 h-48 flex items-center justify-center">
              <img :src="device.image" :alt="device.name" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>

          <!-- 设备信息 -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-semibold text-gray-900">
              {{ device.name }}
            </h3>
              <span
                class="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded"
              >
                {{ device.type }}
              </span>
            </div>

            <p class="text-gray-600 text-sm mb-4">
              {{ device.description }}
            </p>

            <!-- 资源列表 -->
            <div class="space-y-3">
              <div
                v-for="resource in device.resources"
                :key="resource.type"
                @click="goToResourceDetail(device, resource)"
                class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer group"
              >
                <div class="flex items-center space-x-3">
                  <Download class="w-4 h-4 text-primary-500" />
                  <div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600">
                      {{ resource.type }}
                    </span>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {{ resource.version }} • {{ resource.size }}
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500 dark:text-gray-400">查看详情</span>
                  <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                </div>
              </div>
            </div>

            <!-- 注意事项 -->
            <div
              class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
            >
              <div class="flex items-center space-x-2 mb-2">
                <AlertTriangle class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span class="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  刷机注意事项
                </span>
              </div>
              <ul class="text-xs text-yellow-700 dark:text-yellow-400 space-y-1">
                <li>• 刷机有风险，请谨慎操作</li>
                <li>• 提前备份重要数据</li>
                <li>• 确保设备电量充足</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredDevices.length === 0" class="text-center py-12">
        <Package class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400">暂无 {{ selectedDevice }} 设备的刷机资源</p>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Smartphone, Download, AlertTriangle, Package, X, ArrowRight } from 'lucide-vue-next'

const router = useRouter()

interface Resource {
  type: string
  url: string
  version?: string
  size?: string
  description?: string
}

interface Device {
  id: string
  name: string
  type: string
  description: string
  image: string
  resources: Resource[]
  details?: {
    processor: string
    ram: string
    storage: string
    screen: string
    battery: string
  }
}

const selectedDevice = ref('全部')
const devices = ref<Device[]>([])
const deviceTypes = ref<string[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// API基础URL
const API_BASE = 'http://localhost:3000/api'

// 获取设备数据
const fetchDevices = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch(`${API_BASE}/devices?type=${selectedDevice.value === '全部' ? '' : selectedDevice.value}`)
    const result = await response.json()
    
    if (result.success) {
      devices.value = result.data
    } else {
      throw new Error(result.error || '获取设备数据失败')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '网络请求失败'
    console.error('获取设备数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 获取设备类型
const fetchDeviceTypes = async () => {
  try {
    const response = await fetch(`${API_BASE}/devices/types/list`)
    const result = await response.json()
    
    if (result.success) {
      deviceTypes.value = result.data
    }
  } catch (err) {
    console.error('获取设备类型失败:', err)
  }
}

const filteredDevices = computed(() => {
  if (selectedDevice.value === '全部') {
    return devices.value
  }
  return devices.value.filter((device) => device.type === selectedDevice.value)
})

// 监听设备类型变化
const handleDeviceTypeChange = () => {
  fetchDevices()
}

const downloadResource = (device: Device, resource: Resource) => {
  // 检查URL是否有效
  if (!resource.url || resource.url === '#') {
    console.log(`资源 ${resource.type} 暂无下载链接`)
    alert(`抱歉，${resource.type} 资源暂时无法下载`)
    return
  }
  
  // 处理URL编码和特殊字符
  try {
    const decodedUrl = decodeURIComponent(resource.url)
    console.log(`下载 ${device.name} 的 ${resource.type}`, decodedUrl)
    
    // 在新窗口打开下载链接
    window.open(resource.url, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('URL处理错误:', error)
    // 如果解码失败，直接使用原始URL
    window.open(resource.url, '_blank', 'noopener,noreferrer')
  }
}

const goToResourceDetail = (device: Device, resource: Resource) => {
  router.push({
    name: 'AndroidDeviceDetail',
    params: {
      deviceId: device.id,
      resourceType: resource.type
    }
  })
}

// 初始化数据
onMounted(async () => {
  await Promise.all([
    fetchDeviceTypes(),
    fetchDevices()
  ])
})
</script>
