import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language;

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
      {(['uk', 'en'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
            current === lang
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {lang === 'uk' ? 'UA' : 'EN'}
        </button>
      ))}
    </div>
  );
};