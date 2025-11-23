import React from 'react';
import { Download, Sparkles, History, Trash2, CheckCircle } from 'lucide-react';
import { translations } from '../translations';
import { Language, GeneratedResult } from '../types';

interface ResultDisplayProps {
  currentImage: GeneratedResult | null;
  history: GeneratedResult[];
  isGenerating: boolean;
  language: Language;
  onSelectHistory: (item: GeneratedResult) => void;
  onClearHistory: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ 
  currentImage, 
  history, 
  isGenerating, 
  language,
  onSelectHistory,
  onClearHistory
}) => {
  const t = translations[language].result;

  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage.imageUrl;
    link.download = `chicgen-model-${currentImage.timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatedImage = currentImage?.imageUrl;

  return (
    <div className="h-full flex flex-col">
       <div className="mb-4 flex justify-between items-end flex-shrink-0">
        <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            {t.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
        </div>
        {generatedImage && !isGenerating && (
             <div className="flex gap-2">
                 <button 
                   onClick={handleDownload}
                   className="flex items-center gap-2 text-xs font-medium bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                 >
                    <Download className="h-3.5 w-3.5" />
                    {t.download}
                 </button>
             </div>
        )}
      </div>

      {/* Main Image Display */}
      <div className="flex-1 relative rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center shadow-inner min-h-0">
        {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 z-10 bg-slate-900/50 backdrop-blur-sm">
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-lg font-medium animate-pulse">{t.loading}</p>
                <p className="text-sm text-white/50 mt-2">{t.loadingSub}</p>
            </div>
        ) : null}

        {!generatedImage && !isGenerating && (
            <div className="text-center p-8 text-slate-500">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                    <Sparkles className="h-8 w-8 text-slate-600" />
                </div>
                <p>{t.empty}</p>
                <p className="text-sm mt-1">{t.emptySub}</p>
            </div>
        )}

        {generatedImage && (
            <img 
                src={generatedImage} 
                alt="Generated Model" 
                className={`max-w-full max-h-full object-contain shadow-2xl transition-opacity duration-700 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}
            />
        )}
      </div>

      {/* History Strip */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
               <div className="bg-indigo-100 p-1 rounded">
                   <History className="h-3.5 w-3.5 text-indigo-600" />
               </div>
               {t.historyTitle} 
               <span className="text-slate-400 font-normal">({history.length})</span>
             </h3>
             <button 
                onClick={onClearHistory}
                className="text-xs text-slate-400 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
             >
               <Trash2 className="h-3 w-3" />
               {t.clearHistory}
             </button>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex gap-3 overflow-x-auto custom-scrollbar snap-x pb-1">
                {history.map((item) => {
                    const isSelected = currentImage?.id === item.id;
                    return (
                        <button
                        key={item.id}
                        onClick={() => onSelectHistory(item)}
                        className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all snap-start group ${
                            isSelected
                            ? 'border-indigo-600 ring-2 ring-indigo-100 ring-offset-1 shadow-md scale-105 z-10' 
                            : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100 grayscale hover:grayscale-0'
                        }`}
                        >
                        <img 
                            src={item.imageUrl} 
                            alt="History" 
                            className="w-full h-full object-cover" 
                        />
                        {isSelected && (
                            <div className="absolute inset-0 bg-indigo-900/20 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white drop-shadow-md" />
                            </div>
                        )}
                        </button>
                    );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};