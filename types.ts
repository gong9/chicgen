export type Language = 'zh' | 'en';

export interface GenerationSettings {
  gender: 'female' | 'male' | 'non-binary';
  ethnicity: string;
  environment: string;
  vibe: string;
  clothingType: string;
}

export interface GeneratedResult {
  id: string;
  imageUrl: string;
  videoUrl?: string;
  timestamp: number;
  settings?: GenerationSettings;
}

export const ENVIRONMENTS = [
  { id: 'minimalist-studio', prompt: 'in a high-end professional commercial photography studio, soft diffused softbox lighting, plain neutral background, 8k resolution, sharp details, real photography' },
  { id: 'parisian-street', prompt: 'on a chic street in Paris, natural soft daylight, bokeh background, depth of field, real street texture, 35mm film photography' },
  { id: 'urban-industrial', prompt: 'in a modern industrial loft with concrete walls, dramatic cinematic lighting, tyndall effect, sharp focus, 8k raw photo' },
  { id: 'nature-garden', prompt: 'in a luxury private garden, natural sunlight, dappled light through leaves, realistic vegetation, high dynamic range, 85mm lens' },
  { id: 'golden-hour-beach', prompt: 'on a real beach during golden hour, warm natural lighting, realistic ocean background, soft breeze, detailed hair texture' },
  { id: 'luxury-hotel', prompt: 'interior of a 5-star hotel lobby, elegant architecture, indoor ambient lighting, realistic marble textures, professional architectural photography' },
];

export const VIBES = [
  { id: 'editorial', prompt: 'high fashion vogue editorial, confident gaze, elegant posture, masterpiece, professional color grading' },
  { id: 'casual', prompt: 'relaxed lifestyle photography, candid moment, natural smile, soft focus background, social media influencer style' },
  { id: 'professional', prompt: 'professional e-commerce lookbook shot, neutral expression, standing straight, clear product visibility, studio lighting' },
];
