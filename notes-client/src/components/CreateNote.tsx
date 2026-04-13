import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NoteForm } from './NoteForm';
import { useCreateNote } from '../api/useNotes';

export const CreateNote = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useCreateNote();

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('form.back')}
          </button>
          <span className="text-gray-200">|</span>
          <h1 className="text-base font-semibold text-gray-900">{t('form.createTitle')}</h1>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <NoteForm onSubmit={onSubmit} isLoading={isPending} />
        </div>
      </main>
    </div>
  );
};