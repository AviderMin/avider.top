<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span class="text-gradient">Avider.Top</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            AviderMin的个人空间 - 分享安卓刷机、电脑装机、音乐与工具
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <router-link to="/android" class="btn-geek">
              <Smartphone class="w-5 h-5 mr-2" />
              安卓刷机
            </router-link>
            <router-link to="/windows" class="btn-geek">
              <Monitor class="w-5 h-5 mr-2" />
              Windows设备
            </router-link>
            <router-link to="/toolbox" class="btn-geek">
        <Wrench class="w-5 h-5 mr-2" />
        工具箱
      </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- GitHub README Section -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card-geek p-8">
          <div class="prose prose-lg max-w-none">
            <div class="readme-content">
              <h1>Hi, I'm AviderMin</h1>
              <p>😀 A college school student from China</p>
              
              <h2>My Status</h2>
              
              <div class="stats-grid">
                <div class="stat-item">
                  <picture>
                    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api?username=avidermin&show_icons=true&theme=tokyonight&card_width=400&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=1800">
                    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api?username=avidermin&show_icons=true&theme=default&card_width=400&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=1800">
                    <img alt="GitHub Stats" src="https://github-readme-stats.vercel.app/api?username=avidermin&show_icons=true&card_width=400&hide_border=true&count_private=true&include_all_commits=true&cache_seconds=1800" width="400">
                  </picture>
                </div>
                <div class="stat-item">
                  <picture>
                    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=avidermin&layout=compact&theme=tokyonight&card_width=400&hide_border=true">
                    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats.vercel.app/api/top-langs/?username=avidermin&layout=compact&card_width=400&hide_border=true">
                    <img alt="Top Languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=avidermin&layout=compact&card_width=400&hide_border=true" width="400">
                  </picture>
                </div>
              </div>
              
              <div class="activity-graph">
                <picture>
                  <source srcset="https://github-readme-activity-graph.vercel.app/graph?username=avidermin&theme=github-compact&hide_border=true&bg_color=transparent">
                  <img src="https://github-readme-activity-graph.vercel.app/graph?username=avidermin&theme=github-compact&hide_border=true&bg_color=transparent" alt="Activity Graph">
                </picture>
              </div>
              
              <h3>Using Now</h3>
              <div class="badges">
                <img src="https://img.shields.io/badge/Vue.js-42b883?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue.js"/>
                <img src="https://img.shields.io/badge/Shell-black?style=flat-square&logo=gnu-bash&logoColor=white" alt="Shell"/>
                <img src="https://img.shields.io/badge/HTML-orange?style=flat-square&logo=html5&logoColor=white" alt="HTML"/>
                <img src="https://img.shields.io/badge/CSS-blue?style=flat-square&logo=css&logoColor=white" alt="CSS"/>
                <img src="https://img.shields.io/badge/JavaScript-yellow?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
              </div>
              
              <h3>Learning Now</h3>
              <div class="badges">
                <img src="https://img.shields.io/badge/C-blue?style=flat-square&logo=c&logoColor=white" alt="C"/>
                <img src="https://img.shields.io/badge/Python-blue?style=flat-square&logo=python&logoColor=white" alt="Python"/>
                <img src="https://img.shields.io/badge/Java-red?style=flat-square&logo=openjdk&logoColor=white" alt="Java"/>
                <img src="https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white" alt="Rust"/>
                <img src="https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
              </div>
              
              <h3>My Devices</h3>
              <div class="badges">
                <img src="https://img.shields.io/badge/REDMI%20Note%2012%20Turbo-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff" alt="REDMI Note 12 Turbo"/>
                <img src="https://img.shields.io/badge/REDMI%20K40S-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff" alt="REDMI K40S"/>
                <img src="https://img.shields.io/badge/Xiaomi%20Pad%205-ff6900?style=flat-square&logo=xiaomi&logoColor=ffffff" alt="Xiaomi Pad 5"/>
              </div>
              
              <h3>Development Environment</h3>
              <div class="badges">
                <img src="https://img.shields.io/badge/Windows%2011%2025H2-00adef?style=flat-square&logo=windows&logoColor=ffffff" alt="Windows11 25H2"/>
                <img src="https://img.shields.io/badge/Android%2015-3ddc84?style=flat-square&logo=android&logoColor=ffffff" alt="Android 15"/>
                <img src="https://img.shields.io/badge/WSL%20Ubuntu%2024.04.1-orange?style=flat-square&logo=ubuntu&logoColor=white" alt="WSL Ubuntu 24.04.1"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          开始探索极客世界
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          无论你是安卓刷机爱好者、电脑装机达人，还是工具控，这里都有你需要的资源
        </p>
        <router-link to="/android" class="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
          立即开始
          <ArrowRight class="w-5 h-5 ml-2" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Smartphone, Monitor, Wrench, ArrowRight } from 'lucide-vue-next'
</script>