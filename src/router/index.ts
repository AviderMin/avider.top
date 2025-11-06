import { createRouter, createWebHistory } from 'vue-router'

// 懒加载页面组件
const HomePage = () => import('@/views/HomePage.vue')
const AndroidDevices = () => import('@/views/AndroidDevices.vue')
const AndroidDeviceDetail = () => import('@/views/AndroidDeviceDetail.vue')
const WindowsDevices = () => import('@/views/WindowsDevices.vue')
const WebMusicPlayer = () => import('@/views/WebMusicPlayer.vue')
const ToolBox = () => import('@/views/ToolBox.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: { title: 'Avider.Top - AviderMin的个人空间' }
    },
    {
      path: '/android',
      name: 'AndroidDevices',
      component: AndroidDevices,
      meta: { title: '安卓刷机 - Avider.Top' }
    },
    {
      path: '/android/:deviceId/:resourceType',
      name: 'AndroidDeviceDetail',
      component: AndroidDeviceDetail,
      meta: { title: '设备详情 - Avider.Top' }
    },
    {
      path: '/windows',
      name: 'WindowsDevices',
      component: WindowsDevices,
      meta: { title: 'Windows设备 - Avider.Top' }
    },
    {
      path: '/music',
      name: 'WebMusicPlayer',
      component: WebMusicPlayer,
      meta: { title: '音乐播放器 - Avider.Top' }
    },
    {
      path: '/toolbox',
      name: 'ToolBox',
      component: ToolBox,
      meta: { title: '工具箱 - Avider.Top' }
    }
  ],
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
