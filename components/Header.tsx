import React from 'react';
import { Camera, Sparkles, Globe } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = translations[language].header;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{t.title}</h1>
              <p className="text-xs text-slate-500 font-medium">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
             >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'CN' : 'EN'}</span>
             </button>
             <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span>{t.poweredBy}</span>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};