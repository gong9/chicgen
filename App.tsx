import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ImageUpload } from './components/ImageUpload';
import { ResultDisplay } from './components/ResultDisplay';
import { GenerationSettings, Language, GeneratedResult } from './types';
import { generateFashionImage } from './services/geminiService';
import { translations } from './translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Pure Base64
  const [mimeType, setMimeType] = useState<string>('image/png');
  
  // History State
  const [history, setHistory] = useState<GeneratedResult[]>([]);
  const [currentResult, setCurrentResult] = useState<GeneratedResult | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState<GenerationSettings>({
    gender: 'female',
    ethnicity: 'asian', 
    environment: 'minimalist-studio',
    vibe: 'editorial',
    clothingType: '',
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('chicgen_history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
        if (parsed.length > 0) {
          setCurrentResult(parsed[0]);
        }
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chicgen_history', JSON.stringify(history));
  }, [history]);

  const handleImageSelect = (base64: string, type: string) => {
    setSelectedImage(base64);
    setMimeType(type);
    // We don't clear currentResult here so user can still see previous results while uploading
    setError(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateFashionImage(selectedImage, mimeType, settings);
      
      const newResult: GeneratedResult = {
        id: crypto.randomUUID(),
        imageUrl: imageUrl,
        timestamp: Date.now(),
        settings: { ...settings }
      };

      setHistory(prev => [newResult, ...prev]);
      setCurrentResult(newResult);

    } catch (err: any) {
      console.error(err);
      setError(translations[language].errors.genFailed || "Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm(language === 'zh' ? '确定要清空所有历史记录吗？' : 'Are you sure you want to clear all history?')) {
        setHistory([]);
        setCurrentResult(null);
        localStorage.removeItem('chicgen_history');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header language={language} setLanguage={setLanguage} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3 animate-fade-in">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {error}
            </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)] min-h-[600px]">
          {/* Left Column: Controls (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6 h-full">
            <ControlPanel 
                settings={settings}
                setSettings={setSettings}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                canGenerate={!!selectedImage && settings.clothingType.length > 0}
                language={language}
            />
          </div>

          {/* Middle Column: Upload (4 cols) */}
           <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
             <ImageUpload 
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
                onClear={handleClearImage}
                language={language}
             />
           </div>

          {/* Right Column: Result (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full">
             <ResultDisplay 
                currentImage={currentResult}
                history={history}
                isGenerating={isGenerating}
                language={language}
                onSelectHistory={setCurrentResult}
                onClearHistory={handleClearHistory}
             />
          </div>
        </div>
      </main>
    </div>
  );
}