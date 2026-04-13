import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-full bg-gray-100 p-1">
      {['uk', 'en'].map((lang) => (
        <button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
            i18n.language === lang 
            ? 'bg-white text-indigo-600 shadow-sm' 
            : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
};