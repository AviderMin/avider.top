import express from 'express';

const router = express.Router();

// 设备数据
const devicesData = {
  android: [
    {
      id: 'marble',
      name: '红米Note 12 Turbo',
      type: '手机',
      description: '高性能中端手机，支持多种自定义ROM',
      image: '/devices/marble.png',
      resources: [
        { 
          type: '内核', 
          url: '#', 
          version: 'v5.15', 
          size: '15MB',
          description: '设备内核文件，支持最新功能'
        },
        { 
          type: '橙狐Recovery', 
          url: 'https://olist.avider.top/d/%E9%AB%98%E9%80%9F/%E5%88%B7%E6%9C%BA/Redmi%20Note%2012%20Turbo%20(marble)/Recovery/OrangeFox-R11.3-Unofficial-marble-2511036.zip', 
          version: '2511036', 
          size: '43.74MB',
          description: '橙狐Recovery，支持多种刷机操作'
        },
      ],
      details: {
        processor: '骁龙7+ Gen 2',
        ram: '12GB/16GB',
        storage: '256GB/512GB',
        screen: '6.67英寸 OLED',
        battery: '5000mAh'
      }
    },
    {
      id: 'munch',
      name: 'Redmi K40S',
      type: '手机',
      description: '性价比旗舰，刷机资源丰富',
      image: '/devices/munch.png',
      resources: [
        { 
          type: '内核', 
          url: '#', 
          version: 'v5.10', 
          size: '14MB',
          description: '设备内核文件，稳定可靠'
        },
        { 
          type: '橙狐Recovery', 
          url: 'https://olist.avider.top/d/%E9%AB%98%E9%80%9F/%E5%88%B7%E6%9C%BA/Redmi%20K40S%20(munch)/Recovery/OrangeFox-R11.3-Unofficial-munch-2511036.zip', 
          version: '2511036', 
          size: '72.96MB',
          description: '橙狐Recovery，支持多种刷机操作'
        },
      ],
      details: {
        processor: '骁龙870',
        ram: '8GB/12GB',
        storage: '128GB/256GB',
        screen: '6.67英寸 AMOLED',
        battery: '4500mAh'
      }
    },
    {
      id: 'nabu',
      name: '小米平板5',
      type: '平板',
      description: '大屏娱乐平板，支持自定义系统',
      image: '/devices/nabu.png',
      resources: [
        { 
          type: '内核', 
          url: '#', 
          version: 'v5.4', 
          size: '18MB',
          description: '设备内核文件，优化平板体验'
        },
        { 
          type: '橙狐Recovery', 
          url: 'https://olist.avider.top/d/%E9%AB%98%E9%80%9F/%E5%88%B7%E6%9C%BA/Xiaomi%205%20Pad%20(nabu)/Recovery/OrangeFox-R11.3-Unofficial-nabu-2511036.zip', 
          version: '2511036', 
          size: '65.60MB',
          description: '橙狐Recovery，支持平板设备刷机'
        },
      ],
      details: {
        processor: '骁龙860',
        ram: '6GB',
        storage: '128GB/256GB',
        screen: '11英寸 LCD',
        battery: '8720mAh'
      }
    }
  ]
};

// 获取所有设备
router.get('/', (req, res) => {
  try {
    const { type, search } = req.query;
    let devices = devicesData.android;
    
    // 按类型筛选
    if (type && type !== '全部') {
      devices = devices.filter(device => device.type === type);
    }
    
    // 搜索功能
    if (search) {
      const searchTerm = search.toLowerCase();
      devices = devices.filter(device => 
        device.name.toLowerCase().includes(searchTerm) ||
        device.description.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      data: devices,
      total: devices.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取设备数据失败',
      message: error.message
    });
  }
});

// 获取设备详情
router.get('/:deviceId', (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = devicesData.android.find(d => d.id === deviceId);
    
    if (!device) {
      return res.status(404).json({
        success: false,
        error: '设备未找到'
      });
    }
    
    res.json({
      success: true,
      data: device
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取设备详情失败',
      message: error.message
    });
  }
});

// 获取设备资源详情
router.get('/:deviceId/resources/:resourceType', (req, res) => {
  try {
    const { deviceId, resourceType } = req.params;
    const device = devicesData.android.find(d => d.id === deviceId);
    
    if (!device) {
      return res.status(404).json({
        success: false,
        error: '设备未找到'
      });
    }
    
    const resource = device.resources.find(r => r.type === resourceType);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        error: '资源未找到'
      });
    }
    
    res.json({
      success: true,
      data: {
        device: {
          id: device.id,
          name: device.name,
          type: device.type,
          image: device.image,
          details: device.details
        },
        resource: resource
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取资源详情失败',
      message: error.message
    });
  }
});

// 获取设备类型列表
router.get('/types/list', (req, res) => {
  try {
    const types = ['全部', ...new Set(devicesData.android.map(device => device.type))];
    
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '获取设备类型失败',
      message: error.message
    });
  }
});

export default router;