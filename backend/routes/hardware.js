import express from 'express';

const router = express.Router();

// 硬件配置数据
const hardwareData = {
  // 电脑装机配置
  configs: [
    {
      id: 'config-1',
      name: '入门办公配置',
      usage: '办公学习',
      totalPrice: 2899,
      performanceScore: 65,
      valueScore: 8.5,
      description: '适合日常办公、学习使用的入门级配置，性价比极高',
      components: [
        { type: 'CPU', model: 'Intel Core i3-12100', price: 899 },
        { type: '主板', model: 'H610M', price: 499 },
        { type: '内存', model: '16GB DDR4 3200MHz', price: 299 },
        { type: '硬盘', model: '512GB NVMe SSD', price: 299 },
        { type: '显卡', model: '核显 UHD 730', price: 0 },
        { type: '电源', model: '450W 80Plus', price: 199 },
        { type: '机箱', model: 'MATX 机箱', price: 149 },
        { type: '显示器', model: '24英寸 1080P', price: 555 }
      ]
    },
    {
      id: 'config-2',
      name: '主流游戏配置',
      usage: '游戏娱乐',
      totalPrice: 6899,
      performanceScore: 85,
      valueScore: 7.8,
      description: '畅玩主流游戏的高性价比配置，支持2K分辨率游戏',
      components: [
        { type: 'CPU', model: 'AMD Ryzen 5 5600X', price: 1299 },
        { type: '主板', model: 'B550M', price: 699 },
        { type: '内存', model: '32GB DDR4 3600MHz', price: 599 },
        { type: '硬盘', model: '1TB NVMe SSD', price: 499 },
        { type: '显卡', model: 'RTX 4060 8GB', price: 2499 },
        { type: '电源', model: '650W 80Plus Bronze', price: 399 },
        { type: '机箱', model: 'ATX 游戏机箱', price: 299 },
        { type: '显示器', model: '27英寸 2K 144Hz', price: 1105 }
      ]
    },
    {
      id: 'config-3',
      name: '设计创作配置',
      usage: '设计创作',
      totalPrice: 12999,
      performanceScore: 92,
      valueScore: 7.2,
      description: '专业设计、视频剪辑等高负载工作的强力配置',
      components: [
        { type: 'CPU', model: 'Intel Core i7-13700K', price: 2999 },
        { type: '主板', model: 'Z790', price: 1999 },
        { type: '内存', model: '64GB DDR5 5600MHz', price: 1599 },
        { type: '硬盘', model: '2TB NVMe SSD', price: 999 },
        { type: '显卡', model: 'RTX 4070 12GB', price: 4499 },
        { type: '电源', model: '850W 80Plus Gold', price: 799 },
        { type: '机箱', model: 'ATX 全塔机箱', price: 599 },
        { type: '显示器', model: '32英寸 4K', price: 1305 }
      ]
    },
    {
      id: 'config-4',
      name: '编程开发配置',
      usage: '编程开发',
      totalPrice: 8999,
      performanceScore: 88,
      valueScore: 7.9,
      description: '适合软件开发、虚拟机、容器化等开发工作',
      components: [
        { type: 'CPU', model: 'AMD Ryzen 7 7700X', price: 2299 },
        { type: '主板', model: 'B650', price: 1299 },
        { type: '内存', model: '64GB DDR5 5200MHz', price: 1599 },
        { type: '硬盘', model: '2TB NVMe SSD', price: 999 },
        { type: '显卡', model: 'RTX 4060 Ti 16GB', price: 3499 },
        { type: '电源', model: '750W 80Plus Gold', price: 599 },
        { type: '机箱', model: 'MATX 机箱', price: 299 },
        { type: '显示器', model: '27英寸 2K', price: 1405 }
      ]
    },
    {
      id: 'config-5',
      name: '电竞游戏配置',
      usage: '游戏娱乐',
      totalPrice: 15999,
      performanceScore: 96,
      valueScore: 6.8,
      description: '顶级电竞游戏配置，支持4K高帧率游戏体验',
      components: [
        { type: 'CPU', model: 'Intel Core i9-14900K', price: 4999 },
        { type: '主板', model: 'Z790', price: 2999 },
        { type: '内存', model: '64GB DDR5 6000MHz', price: 1999 },
        { type: '硬盘', model: '4TB NVMe SSD', price: 1999 },
        { type: '显卡', model: 'RTX 4090 24GB', price: 12999 },
        { type: '电源', model: '1200W 80Plus Platinum', price: 1499 },
        { type: '机箱', model: 'ATX 全塔机箱', price: 999 },
        { type: '显示器', model: '32英寸 4K 240Hz', price: 1505 }
      ]
    },
    {
      id: 'config-6',
      name: '家庭影音配置',
      usage: '影音娱乐',
      totalPrice: 5999,
      performanceScore: 72,
      valueScore: 8.9,
      description: '适合家庭影音娱乐，支持4K视频播放和轻度游戏',
      components: [
        { type: 'CPU', model: 'AMD Ryzen 5 5600G', price: 1299 },
        { type: '主板', model: 'B550', price: 799 },
        { type: '内存', model: '32GB DDR4 3200MHz', price: 599 },
        { type: '硬盘', model: '2TB NVMe SSD', price: 899 },
        { type: '显卡', model: '核显 Vega 7', price: 0 },
        { type: '电源', model: '550W 80Plus Bronze', price: 399 },
        { type: '机箱', model: 'MATX HTPC机箱', price: 499 },
        { type: '显示器', model: '27英寸 4K', price: 1505 }
      ]
    }
  ],
  
  // 硬件排行榜数据
  rankings: {
    intelCpu: [
      { id: 'intel-cpu-1', model: 'Intel Core i9-14900K', score: 100, price: 4999 },
      { id: 'intel-cpu-2', model: 'Intel Core i7-14700K', score: 95, price: 3499 },
      { id: 'intel-cpu-3', model: 'Intel Core i5-14600K', score: 88, price: 2499 },
      { id: 'intel-cpu-4', model: 'Intel Core i3-14100', score: 75, price: 1299 },
      { id: 'intel-cpu-5', model: 'Intel Core i9-13900K', score: 98, price: 4499 }
    ],
    amdCpu: [
      { id: 'amd-cpu-1', model: 'AMD Ryzen 9 7950X', score: 99, price: 4999 },
      { id: 'amd-cpu-2', model: 'AMD Ryzen 7 7800X3D', score: 96, price: 3299 },
      { id: 'amd-cpu-3', model: 'AMD Ryzen 5 7600X', score: 85, price: 1699 },
      { id: 'amd-cpu-4', model: 'AMD Ryzen 9 7900X', score: 97, price: 3999 },
      { id: 'amd-cpu-5', model: 'AMD Ryzen 5 5600X', score: 80, price: 1299 }
    ],
    nvidiaGpu: [
      { id: 'nvidia-gpu-1', model: 'NVIDIA RTX 4090', score: 100, price: 12999 },
      { id: 'nvidia-gpu-2', model: 'NVIDIA RTX 4080', score: 95, price: 8999 },
      { id: 'nvidia-gpu-3', model: 'NVIDIA RTX 4070 Ti', score: 88, price: 6499 },
      { id: 'nvidia-gpu-4', model: 'NVIDIA RTX 4060 Ti', score: 80, price: 3499 },
      { id: 'nvidia-gpu-5', model: 'NVIDIA RTX 4060', score: 75, price: 2499 }
    ],
    amdGpu: [
      { id: 'amd-gpu-1', model: 'AMD RX 7900 XTX', score: 98, price: 7999 },
      { id: 'amd-gpu-2', model: 'AMD RX 7900 XT', score: 92, price: 6999 },
      { id: 'amd-gpu-3', model: 'AMD RX 7800 XT', score: 85, price: 4499 },
      { id: 'amd-gpu-4', model: 'AMD RX 7700 XT', score: 78, price: 3699 },
      { id: 'amd-gpu-5', model: 'AMD RX 7600 XT', score: 72, price: 2699 }
    ]
  }
};

// 获取所有配置
router.get('/configs', (req, res) => {
  try {
    const { priceRange, usage, sortBy, search } = req.query;
    let configs = hardwareData.configs;
    
    // 价格区间筛选
    if (priceRange && priceRange !== 'all') {
      const priceRanges = {
        budget: { min: 2000, max: 4000 },
        mid: { min: 4000, max: 8000 },
        high: { min: 8000, max: 15000 },
        enthusiast: { min: 15000, max: Infinity }
      };
      
      const range = priceRanges[priceRange];
      if (range) {
        configs = configs.filter(config => 
          config.totalPrice >= range.min && config.totalPrice <= range.max
        );
      }
    }
    
    // 用途筛选
    if (usage && usage !== 'all') {
      configs = configs.filter(config => config.usage === usage);
    }
    
    // 搜索功能
    if (search) {
      const searchTerm = search.toLowerCase();
      configs = configs.filter(config => 
        config.name.toLowerCase().includes(searchTerm) ||
        config.description.toLowerCase().includes(searchTerm) ||
        config.components.some(comp => 
          comp.model.toLowerCase().includes(searchTerm)
        )
      );
    }
    
    // 排序
    if (sortBy) {
      switch (sortBy) {
        case 'price':
          configs.sort((a, b) => a.totalPrice - b.totalPrice);
          break;
        case 'price-desc':
          configs.sort((a, b) => b.totalPrice - a.totalPrice);
          break;
        case 'performance':
          configs.sort((a, b) => b.performanceScore - a.performanceScore);
          break;
        case 'popularity':
          // 默认按价格排序作为热门度
          configs.sort((a, b) => b.totalPrice - a.totalPrice);
          break;
      }
    }
    
    res.json({
      success: true,
      data: configs,
      total: configs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取配置数据失败',
      message: error.message
    });
  }
});

// 获取配置详情
router.get('/configs/:configId', (req, res) => {
  try {
    const { configId } = req.params;
    const config = hardwareData.configs.find(c => c.id === configId);
    
    if (!config) {
      return res.status(404).json({
        success: false,
        error: '配置未找到'
      });
    }
    
    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取配置详情失败',
      message: error.message
    });
  }
});

// 获取硬件排行榜
router.get('/rankings/:type', (req, res) => {
  try {
    const { type } = req.params;
    const ranking = hardwareData.rankings[type];
    
    if (!ranking) {
      return res.status(404).json({
        success: false,
        error: '排行榜类型不存在'
      });
    }
    
    res.json({
      success: true,
      data: ranking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取排行榜失败',
      message: error.message
    });
  }
});

// 获取所有排行榜类型
router.get('/rankings', (req, res) => {
  try {
    const rankings = Object.keys(hardwareData.rankings).map(type => ({
      type,
      name: getRankingName(type),
      count: hardwareData.rankings[type].length
    }));
    
    res.json({
      success: true,
      data: rankings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取排行榜列表失败',
      message: error.message
    });
  }
});

// 辅助函数：获取排行榜名称
function getRankingName(type) {
  const names = {
    'intelCpu': 'Intel CPU排行榜',
    'amdCpu': 'AMD CPU排行榜',
    'nvidiaGpu': 'NVIDIA显卡排行榜',
    'amdGpu': 'AMD显卡排行榜'
  };
  return names[type] || type;
}

export default router;