import React from 'react';
import { GenerationSettings, ENVIRONMENTS, VIBES, Language } from '../types';
import { Settings2, User2, MapPin, Camera, Shirt } from 'lucide-react';
import { translations } from '../translations';

interface ControlPanelProps {
  settings: GenerationSettings;
  setSettings: React.Dispatch<React.SetStateAction<GenerationSettings>>;
  isGenerating: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
  language: Language;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  setSettings,
  isGenerating,
  onGenerate,
  canGenerate,
  language
}) => {
  const t = translations[language].control;

  const handleChange = (key: keyof GenerationSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-indigo-600" />
          {t.configTitle}
        </h2>
        <p className="text-sm text-slate-500 mt-1">{t.configDesc}</p>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Clothing Type */}
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Shirt className="h-4 w-4" />
                {t.garmentType}
            </label>
            <input
                type="text"
                value={settings.clothingType}
                onChange={(e) => handleChange('clothingType', e.target.value)}
                placeholder={t.garmentPlaceholder}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
             <p className="text-xs text-slate-500">{t.garmentHelp}</p>
        </div>

        {/* Model Settings */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User2 className="h-4 w-4" />
            {t.modelDetails}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">{t.gender}</label>
              <select
                value={settings.gender}
                onChange={(e) => handleChange('gender', e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
              >
                <option value="female">{t.genderOptions.female}</option>
                <option value="male">{t.genderOptions.male}</option>
                <option value="non-binary">{t.genderOptions['non-binary']}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">{t.ethnicity}</label>
              <select
                value={settings.ethnicity}
                onChange={(e) => handleChange('ethnicity', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
              >
                <option value="diverse">{t.ethnicityOptions.diverse}</option>
                <option value="caucasian">{t.ethnicityOptions.caucasian}</option>
                <option value="asian">{t.ethnicityOptions.asian}</option>
                <option value="black">{t.ethnicityOptions.black}</option>
                <option value="hispanic">{t.ethnicityOptions.hispanic}</option>
                <option value="middle eastern">{t.ethnicityOptions['middle eastern']}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Environment Settings */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {t.settingVibe}
          </label>
          
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">{t.environment}</label>
            <div className="grid grid-cols-1 gap-2">
                {ENVIRONMENTS.map((env) => (
                    <button
                        key={env.id}
                        onClick={() => handleChange('environment', env.id)}
                        className={`text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                            settings.environment === env.id
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                    >
                        {/* @ts-ignore - Dynamic key access for localization */}
                        {t.envOptions[env.id] || env.id}
                    </button>
                ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">{t.vibe}</label>
            <select
                value={settings.vibe}
                onChange={(e) => handleChange('vibe', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
              >
                {VIBES.map(v => (
                    // @ts-ignore
                    <option key={v.id} value={v.id}>{t.vibeOptions[v.id] || v.id}</option>
                ))}
              </select>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-slate-100">
        <button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-white font-semibold shadow-lg transition-all transform active:scale-95 ${
            !canGenerate || isGenerating
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.btnGenerating}
            </>
          ) : (
            <>
              <Camera className="h-5 w-5" />
              {t.btnGenerate}
            </>
          )}
        </button>
      </div>
    </div>
  );
};