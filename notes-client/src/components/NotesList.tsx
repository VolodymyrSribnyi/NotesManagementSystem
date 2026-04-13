import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetNotes, useDeleteNote } from '../api/useNotes';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getStatusStyle } from '../utils/statusHelper';

export const NotesList = () => {
  const { t } = useTranslation();
  const { data: notes, isLoading, isError } = useGetNotes();
  const { mutate: deleteNote } = useDeleteNote();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">{t('notes.loading')}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-500 font-medium">{t('notes.error')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">{t('notes.title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/notes/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-150"
            >
              <svg  width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t('notes.createBtn')}
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Stats bar */}
        {notes && notes.length > 0 && (
          <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
            <span>{notes.length} {notes.length === 1 ? 'нотатка' : 'нотаток'}</span>
            <span className="w-1 h-1 rounded-full bg-gray-200" />
            <span className="text-green-600 font-medium">
              {notes.filter((n: any) => n.status?.name?.toLowerCase().includes('done') || n.status?.name?.toLowerCase().includes('виконано')).length} виконано
            </span>
          </div>
        )}

        {/* Empty state */}
        {notes?.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="16" height="16" className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">{t('notes.empty')}</p>
            <Link
              to="/notes/new"
              className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Створити першу нотатку →
            </Link>
          </div>
        )}

        {/* Notes list */}
        <div className="flex flex-col gap-3">
          {notes?.map((note: any) => {
            const style = getStatusStyle(note.status?.name ?? '');
            return (
              <div
                key={note.id}
                className="group bg-white border border-gray-100 rounded-xl p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${style.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {note.status?.name ?? '—'}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold text-gray-900 truncate">{note.name}</h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{note.description}</p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
                    <Link
                      to={`/notes/${note.id}/edit`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors duration-150"
                    >
                      <svg width="16" height="16" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {t('actions.edit')}
                    </Link>
                    <button
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors duration-150"
                      onClick={() => {
                        if (window.confirm(t('notes.deleteConfirm'))) deleteNote(note.id);
                      }}
                    >
                      <svg width="16" height="16" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t('actions.delete')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};