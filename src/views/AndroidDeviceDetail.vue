<template>
  <div class="min-h-screen py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 返回按钮 -->
      <button 
        @click="$router.back()" 
        class="mb-6 flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>返回设备列表</span>
      </button>

      <!-- 设备详情头部 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div class="grid md:grid-cols-2 gap-8 p-8">
          <!-- 设备图片和基本信息 -->
          <div>
            <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 mb-6">
              <img 
                :src="device.image" 
                :alt="device.name" 
                class="w-full max-w-xs mx-auto object-contain"
              />
            </div>
            
            <div class="space-y-4">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ device.name }}</h1>
              <div class="flex items-center space-x-4">
                <span class="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                  {{ device.type }}
                </span>
                <span class="text-gray-500 dark:text-gray-400">{{ resource.type }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-300">{{ device.description }}</p>
              
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="space-y-1">
                  <span class="text-gray-500 dark:text-gray-400">版本:</span>
                  <span class="font-medium">{{ resource.version || '最新版' }}</span>
                </div>
                <div class="space-y-1">
                  <span class="text-gray-500 dark:text-gray-400">大小:</span>
                  <span class="font-medium">{{ resource.size || '未知' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 资源详情和操作 -->
          <div class="space-y-6">
            <!-- 下载按钮 -->
            <div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">下载资源</h3>
              <button
                @click="downloadResource"
                class="w-full bg-primary-500 text-gray-900 px-6 py-3 rounded-lg hover:bg-primary-600 transition-all duration-200 font-medium text-lg flex items-center justify-center space-x-2"
              >
                <Download class="w-5 h-5" />
                <span>下载 {{ resource.type }}</span>
              </button>
            </div>

            <!-- 更新日志 -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FileText class="w-5 h-5" />
                <span>更新日志</span>
              </h3>
              <div class="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div v-for="(log, index) in updateLogs" :key="index" class="border-l-2 border-primary-500 pl-4 py-1">
                  <div class="font-medium">{{ log.version }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ log.date }}</div>
                  <ul class="mt-1 space-y-1">
                    <li v-for="(item, itemIndex) in log.changes" :key="itemIndex" class="text-xs">• {{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 刷入教程 -->
            <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center space-x-2">
                <BookOpen class="w-5 h-5" />
                <span>刷入教程</span>
              </h3>
              <div class="space-y-4 text-sm text-yellow-700 dark:text-yellow-400">
                <div v-for="(step, index) in flashTutorial" :key="index" class="flex items-start space-x-3">
                  <div class="w-6 h-6 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                    {{ index + 1 }}
                  </div>
                  <div>
                    <div class="font-medium">{{ step.title }}</div>
                    <div class="text-xs mt-1">{{ step.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 注意事项 -->
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div class="flex items-center space-x-2 mb-3">
          <AlertTriangle class="w-5 h-5 text-red-600 dark:text-red-400" />
          <span class="text-lg font-semibold text-red-800 dark:text-red-300">重要注意事项</span>
        </div>
        <ul class="space-y-2 text-sm text-red-700 dark:text-red-400">
          <li>• 刷机有风险，操作前请务必备份重要数据</li>
          <li>• 确保设备电量充足（建议50%以上）</li>
          <li>• 严格按照教程步骤操作，避免跳过任何步骤</li>
          <li>• 如遇问题，请及时在相关社区寻求帮助</li>
          <li>• 本资源仅供学习交流使用</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Download, FileText, BookOpen, AlertTriangle } from 'lucide-vue-next'

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

interface UpdateLog {
  version: string
  date: string
  changes: string[]
}

interface TutorialStep {
  title: string
  description: string
}

const route = useRoute()
const router = useRouter()

const device = ref<Device>({
  id: '',
  name: '',
  type: '',
  description: '',
  image: '',
  resources: []
})

const resource = ref<Resource>({
  type: '',
  url: '',
  version: '',
  size: ''
})

const updateLogs = ref<UpdateLog[]>([
  {
    version: 'v1.0.0',
    date: '2024-01-15',
    changes: [
      '初始版本发布',
      '支持基础刷机功能',
      '修复已知问题'
    ]
  }
])

const flashTutorial = ref<TutorialStep[]>([
  {
    title: '准备工作',
    description: '下载所需工具和驱动程序，确保电脑与设备连接正常'
  },
  {
    title: '解锁Bootloader',
    description: '按照官方教程解锁设备的Bootloader'
  },
  {
    title: '刷入Recovery',
    description: '使用fastboot命令刷入自定义Recovery'
  },
  {
    title: '刷入资源',
    description: '在Recovery模式下刷入下载的资源文件'
  },
  {
    title: '重启设备',
    description: '清除缓存后重启设备，完成刷机过程'
  }
])

onMounted(() => {
  // 从路由参数获取设备ID和资源类型
  const deviceId = route.params.deviceId as string
  const resourceType = route.params.resourceType as string
  
  // 模拟从设备列表中查找设备
  const devices: Device[] = [
    {
      id: 'marble',
      name: '红米Note 12 Turbo',
      type: '手机',
      description: '高性能中端手机，支持多种自定义ROM',
      image: '/devices/marble.png',
      resources: [
        { type: '内核', url: '#', version: 'v5.15', size: '15MB' },
        { type: '橙狐Recovery', url: 'https://olist.avider.top/d/%E9%AB%98%E9%80%9F/%E5%88%B7%E6%9C%BA/Redmi%20Note%2012%20Turbo%20(marble)/Recovery/OrangeFox-R11.3-Unofficial-marble-2511036.zip', version: '2511036', size: '43.74MB' },
      ],
    },
    {
      id: 'munch',
      name: 'Redmi K40S',
      type: '手机',
      description: '性价比旗舰，刷机资源丰富',
      image: '/devices/munch.png',
      resources: [
        { type: '内核', url: '#', version: 'v5.10', size: '14MB' },
        { type: '橙狐Recovery', url: 'https://olist.avider.top/d/%E9%AB%98%E9%80%9F/%E5%88%B7%E6%9C%BA/Redmi%20K40S%20(munch)/Recovery/OrangeFox-R11.3-Unofficial-munch-2511036.zip', version: '2511036', size: '72.96MB' },
      ],
    },
    {
      id: 'nabu',
      name: '小米平板5',
      type: '平板',
      description: '大屏娱乐平板，支持自定义系统',
      image: '/devices/nabu.png',
      resources: [
        { type: '内核', url: '#', version: 'v5.4', size: '18MB' },
        { type: '橙狐Recovery', url: 'https://olist.avider.top/d/%E9%AB%98%E9%80%9F/%E5%88%B7%E6%9C%BA/Xiaomi%205%20Pad%20(nabu)/Recovery/OrangeFox-R11.3-Unofficial-nabu-2511036.zip', version: '2511036', size: '65.60MB' },
      ],
    },
  ]

  const foundDevice = devices.find(d => d.id === deviceId)
  if (foundDevice) {
    device.value = foundDevice
    const foundResource = foundDevice.resources.find(r => r.type === resourceType)
    if (foundResource) {
      resource.value = foundResource
    } else {
      // 资源不存在，返回设备列表
      router.back()
    }
  } else {
    // 设备不存在，返回设备列表
    router.back()
  }
})

const downloadResource = () => {
  if (!resource.value.url || resource.value.url === '#') {
    alert(`抱歉，${resource.value.type} 资源暂时无法下载`)
    return
  }
  
  try {
    const decodedUrl = decodeURIComponent(resource.value.url)
    window.open(resource.value.url, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('URL处理错误:', error)
    window.open(resource.value.url, '_blank', 'noopener,noreferrer')
  }
}
</script>