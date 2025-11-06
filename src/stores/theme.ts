import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  
  // 主题颜色配置
  const themeColors = ref({
    primary: '#FFD700',
    secondary: '#FFA500',
    accent: '#FF8C00',
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981'
  })
  
  // 初始化主题 - 始终使用浅色模式
  const initTheme = () => {
    // 强制设置为浅色模式
    isDark.value = false
    localStorage.setItem('theme', 'light')
    
    // 确保移除深色模式类
    document.documentElement.classList.remove('dark')
  }
  
  // 立即初始化主题
  initTheme()
  
  // 禁用主题切换功能
  const toggleTheme = () => {
    console.log('主题切换功能已禁用')
    // 不执行任何操作
  }
  
  // 设置特定主题 - 只允许浅色模式
  const setTheme = (theme: 'light' | 'dark') => {
    if (theme === 'light') {
      isDark.value = false
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
    // 忽略深色模式设置
  }
  
  return {
    isDark,
    toggleTheme,
    setTheme,
    initTheme,
    themeColors
  }
})