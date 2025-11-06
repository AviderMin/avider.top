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
            @click="selectedDevice = device"
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

      <!-- 设备列表 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="device in filteredDevices" :key="device.id" class="card-geek group">
          <!-- 设备图片 -->
          <div
            class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden"
          >
            <div
              class="w-40 h-40 bg-white dark:bg-gray-600 rounded-xl shadow-lg flex items-center justify-center overflow-hidden p-2"
            >
              <img :src="device.image" :alt="device.name" class="w-full h-full object-contain" />
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
                class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div class="flex items-center space-x-3">
                  <Download class="w-4 h-4 text-primary-500" />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ resource.type }}
                  </span>
                </div>
                <button
                  @click="downloadResource(device, resource)"
                  class="text-xs bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition-colors duration-200"
                >
                  下载
                </button>
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

      <!-- 下载管理面板 -->
      <div class="mt-12 card-geek p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">下载链接管理</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              添加新的下载链接
            </label>
            <div class="space-y-3">
              <input
                v-model="newLink.device"
                placeholder="设备名称"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                v-model="newLink.type"
                placeholder="资源类型"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                v-model="newLink.url"
                placeholder="下载链接"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button @click="addNewLink" class="btn-geek w-full">添加链接</button>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              最近添加的链接
            </h4>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div
                v-for="link in recentLinks"
                :key="link.id"
                class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs"
              >
                <span class="text-gray-600 dark:text-gray-400 truncate">
                  {{ link.device }} - {{ link.type }}
                </span>
                <button @click="removeLink(link.id)" class="text-red-500 hover:text-red-700">
                  <X class="w-3 h-3" />
                </button>
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
import { Smartphone, Download, AlertTriangle, Package, X } from 'lucide-vue-next'

interface Resource {
  type: string
  url: string
  version?: string
  size?: string
}

interface Device {
  id: string
  name: string
  type: string
  description: string
  image: string
  resources: Resource[]
}

interface DownloadLink {
  id: string
  device: string
  type: string
  url: string
  timestamp: number
}

const selectedDevice = ref('全部')

const deviceTypes = ['全部', '手机', '平板']

const devices: Device[] = [
  {
    id: 'redmi-note12-turbo',
    name: '红米Note 12 Turbo',
    type: '手机',
    description: '高性能中端手机，支持多种自定义ROM',
    image: '/devices/marble.png',
    resources: [
      { type: '内核', url: '#', version: 'v5.15', size: '15MB' },
      { type: '橙狐Recovery', url: '#', version: 'v12.1', size: '25MB' },
      { type: '刷机教程', url: '#', size: '2MB' },
    ],
  },
  {
    id: 'k40s',
    name: 'Redmi K40S',
    type: '手机',
    description: '性价比旗舰，刷机资源丰富',
    image: '/devices/munch.png',
    resources: [
      { type: '内核', url: '#', version: 'v5.10', size: '14MB' },
      { type: '橙狐Recovery', url: '#', version: 'v11.9', size: '24MB' },
    ],
  },
  {
    id: 'mi-pad-5',
    name: '小米平板5',
    type: '平板',
    description: '大屏娱乐平板，支持自定义系统',
    image: '/devices/nabu.png',
    resources: [
      { type: '内核', url: '#', version: 'v5.4', size: '18MB' },
      { type: '橙狐Recovery', url: '#', version: 'v12.0', size: '28MB' },
    ],
  },
]

const filteredDevices = computed(() => {
  if (selectedDevice.value === '全部') {
    return devices
  }
  return devices.filter((device) => device.type === selectedDevice.value)
})

const newLink = ref({
  device: '',
  type: '',
  url: '',
})

const recentLinks = ref<DownloadLink[]>([
  {
    id: '1',
    device: '红米Note 12 Turbo',
    type: '内核',
    url: 'https://example.com/kernel.zip',
    timestamp: Date.now(),
  },
])

const downloadResource = (device: Device, resource: Resource) => {
  // 模拟下载操作
  console.log(`下载 ${device.name} 的 ${resource.type}`)
  // 实际应用中这里会处理下载逻辑
  window.open(resource.url, '_blank')
}

const addNewLink = () => {
  if (newLink.value.device && newLink.value.type && newLink.value.url) {
    const link: DownloadLink = {
      id: Date.now().toString(),
      device: newLink.value.device,
      type: newLink.value.type,
      url: newLink.value.url,
      timestamp: Date.now(),
    }
    recentLinks.value.unshift(link)

    // 清空表单
    newLink.value = { device: '', type: '', url: '' }
  }
}

const removeLink = (id: string) => {
  recentLinks.value = recentLinks.value.filter((link) => link.id !== id)
}
</script>
