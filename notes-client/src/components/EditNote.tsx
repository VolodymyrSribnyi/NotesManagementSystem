import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NoteForm } from './NoteForm';
import { useGetNote, useUpdateNote } from '../api/useNotes';

export const EditNote = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  if (!id) return <div className="p-8 text-red-500">Error: ID not found</div>;

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
          <h1 className="text-base font-semibold text-gray-900">{t('form.editTitle')}</h1>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <NoteForm initialData={note} onSubmit={onSubmit} isLoading={isPending} />
          </div>
        )}
      </main>
    </div>
  );
};