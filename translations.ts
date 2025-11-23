export const translations = {
  zh: {
    header: {
      title: 'ChicGen',
      subtitle: 'AI 智绘穿搭',
      poweredBy: '基于 Gemini 2.5',
    },
    control: {
      configTitle: '拍摄配置',
      configDesc: '定制您的专属模特与场景',
      garmentType: '服装名称',
      garmentPlaceholder: '例如：夏季碎花连衣长裙...',
      garmentHelp: '请具体描述服装的款式、材质或颜色。',
      modelDetails: '模特特征',
      gender: '性别',
      ethnicity: '肤色/种族',
      environment: '拍摄场景',
      vibe: '摄影风格',
      btnGenerate: '生成大片',
      btnGenerating: '正在拍摄中...',
      genderOptions: {
        female: '女性',
        male: '男性',
        'non-binary': '通用/中性',
      },
      ethnicityOptions: {
        diverse: '随机/多元',
        caucasian: '白人',
        asian: '亚洲人',
        black: '黑人',
        hispanic: '拉丁裔',
        'middle eastern': '中东裔',
      },
      envOptions: {
        'minimalist-studio': '极简高级影棚 (白/灰背景)',
        'parisian-street': '巴黎街头 (自然光)',
        'urban-industrial': '现代工业风 (冷调)',
        'nature-garden': '奢华花园 (阳光斑驳)',
        'golden-hour-beach': '落日海滩 (暖调)',
        'luxury-hotel': '高级酒店大堂 (室内)',
      },
      vibeOptions: {
        'editorial': '高级杂志风 (冷艳/艺术)',
        'casual': '生活随拍 (自然/亲切)',
        'professional': '电商展示 (清晰/中性)',
      }
    },
    upload: {
      title: '上传服装',
      subtitle: '请上传服装的平铺图、挂拍图或模特图',
      dragDrop: '点击上传或拖拽图片至此',
      formats: '支持 JPG, PNG, WEBP',
    },
    result: {
      title: '成片展示',
      subtitle: 'AI 生成的模特上身效果',
      download: '下载原图',
      loading: '正在为您生成大片...',
      loadingSub: '大约需要 15-20 秒，请耐心等待',
      empty: '暂无生成图片',
      emptySub: '请在左侧上传图片并点击“生成大片”',
      historyTitle: '历史记录',
      clearHistory: '清空',
    },
    errors: {
      genFailed: '生成失败，请重试。',
    }
  },
  en: {
    header: {
      title: 'ChicGen',
      subtitle: 'AI Fashion Studio',
      poweredBy: 'Powered by Gemini 2.5',
    },
    control: {
      configTitle: 'Configuration',
      configDesc: 'Customize your model and scene.',
      garmentType: 'Garment Type',
      garmentPlaceholder: 'e.g. Summer floral dress...',
      garmentHelp: 'Be specific about what the item is.',
      modelDetails: 'Model Details',
      gender: 'Gender',
      ethnicity: 'Ethnicity',
      environment: 'Environment',
      vibe: 'Photography Style',
      btnGenerate: 'Generate Photoshoot',
      btnGenerating: 'Styling & Photographing...',
      genderOptions: {
        female: 'Female',
        male: 'Male',
        'non-binary': 'Non-Binary',
      },
      ethnicityOptions: {
        diverse: 'Diverse / Any',
        caucasian: 'Caucasian',
        asian: 'Asian',
        black: 'Black / African Descent',
        hispanic: 'Hispanic / Latinx',
        'middle eastern': 'Middle Eastern',
      },
      envOptions: {
        'minimalist-studio': 'Minimalist Studio',
        'parisian-street': 'Parisian Street',
        'urban-industrial': 'Urban Industrial',
        'nature-garden': 'Luxury Garden',
        'golden-hour-beach': 'Golden Hour Beach',
        'luxury-hotel': 'Luxury Hotel Lobby',
      },
      vibeOptions: {
        'editorial': 'High Fashion / Editorial',
        'casual': 'Lifestyle / Casual',
        'professional': 'Professional / E-commerce',
      }
    },
    upload: {
      title: 'Original Garment',
      subtitle: 'Upload a photo of your clothing (flat lay or dummy).',
      dragDrop: 'Click to upload or drag & drop',
      formats: 'Supported formats: JPG, PNG, WEBP',
    },
    result: {
      title: 'Generated Model',
      subtitle: 'AI-generated photoshoot.',
      download: 'Download',
      loading: 'Creating masterpiece...',
      loadingSub: 'This may take up to 20 seconds',
      empty: 'No model generated yet.',
      emptySub: 'Upload a garment and click "Generate Photoshoot"',
      historyTitle: 'History',
      clearHistory: 'Clear',
    },
    errors: {
      genFailed: 'Failed to generate image. Please try again.',
    }
  }
};