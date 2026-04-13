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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('form.back')}
            </button>

            <div className="w-px h-5 bg-slate-200" />

            <h1 className="text-lg font-semibold text-slate-900">
              {t('form.createTitle')}
            </h1>
          </div>

        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        <div className="transition-all duration-300">
          <NoteForm
            onSubmit={onSubmit}
            isLoading={isPending}
          />
        </div>

      </main>
    </div>
  );
};