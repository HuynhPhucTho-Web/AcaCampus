import { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import type { Theme } from '../../stypes';
import { useLanguage } from './LanguageContext';

export default function LanguageSwitcher({
  theme,
  onCloseOtherMenus,
}: {
  theme: Theme;
  onCloseOtherMenus?: () => void;
}) {
  const { language, setLanguage, languages, labels } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => {
          onCloseOtherMenus?.();
          setOpen(!open);
        }}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
          theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-600'
        }`}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{languages.find((l) => l.code === language)?.flag}</span>
      </button>

      {open && (
        <div
          className={`absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden shadow-lg max-h-60 overflow-y-auto ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-600 ${
                language === lang.code ? 'bg-purple-100 dark:bg-purple-700' : ''
              } ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* keep labels in case future translations need it */}
      <span className="hidden">{labels.language}</span>

    </div>
  );
}

