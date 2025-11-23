import React, { useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface ImageUploadProps {
  selectedImage: string | null;
  onImageSelect: (base64: string, mimeType: string) => void;
  onClear: () => void;
  language: Language;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ selectedImage, onImageSelect, onClear, language }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[language].upload;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const mimeType = base64String.split(';')[0].split(':')[1];
      const base64Data = base64String.split(',')[1];
      
      onImageSelect(base64Data, mimeType);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="h-full flex flex-col">
       <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-indigo-600" />
          {t.title}
        </h2>
        <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
      </div>
      
      <div 
        className={`flex-1 relative rounded-2xl border-2 border-dashed transition-all overflow-hidden ${
          selectedImage 
            ? 'border-indigo-200 bg-slate-50' 
            : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
             <img 
               src={`data:image/png;base64,${selectedImage}`} 
               alt="Uploaded garment" 
               className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
             />
             <button 
               onClick={onClear}
               className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-red-50 text-slate-600 hover:text-red-500 transition-colors"
             >
               <X className="h-5 w-5" />
             </button>
          </div>
        ) : (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-center p-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="h-8 w-8" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">{t.dragDrop}</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-[200px]">
              {t.formats}
            </p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
    </div>
  );
};