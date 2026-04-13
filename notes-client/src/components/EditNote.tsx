import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NoteForm } from './NoteForm';
import { useGetNote, useUpdateNote } from '../api/useNotes';

export const EditNote = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white border border-red-200 text-red-500 px-6 py-4 rounded-xl shadow-sm">
          Error: ID not found
        </div>
      </div>
    );
  }

  const { data: note, isLoading } = useGetNote(id);
  const { mutateAsync, isPending } = useUpdateNote();

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync({ id, updatedNote: data });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

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
              {t('form.editTitle')}
            </h1>
          </div>

        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-500">Завантаження нотатки...</p>
            </div>
          </div>
        ) : (
          <div className="transition-all duration-300">
            <NoteForm
              initialData={note}
              onSubmit={onSubmit}
              isLoading={isPending}
            />
          </div>
        )}
      </main>
    </div>
  );
};