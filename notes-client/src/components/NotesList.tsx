import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetNotes, useDeleteNote } from '../api/useNotes';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getStatusStyle } from '../utils/statusHelper';

export const NotesList = () => {
  const { t } = useTranslation();
  const { data: notes, isLoading, isError } = useGetNotes();
  const { mutate: deleteNote } = useDeleteNote();

  const totalNotes = notes?.length ?? 0;
  const doneNotes =
    notes?.filter(
      (n: any) =>
        n.status?.name?.toLowerCase().includes('done') ||
        n.status?.name?.toLowerCase().includes('виконано')
    ).length ?? 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-8 py-10 shadow-lg">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium">{t('notes.loading')}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 flex items-center justify-center px-4">
        <div className="text-center p-8 bg-white rounded-2xl border border-red-100 shadow-lg max-w-md w-full">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86l-8.2 14.2A2 2 0 003.82 21h16.36a2 2 0 001.73-2.94l-8.2-14.2a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <p className="text-red-500 font-semibold">{t('notes.error')}</p>
          <p className="text-slate-500 text-sm mt-2">Спробуй оновити сторінку або перевірити API.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
                <svg width="18" height="18" className="text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {t('notes.title')}
                </h1>
                <p className="text-xs text-slate-500">Simple notes dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                to="/notes/new"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
              >
                <svg width="16" height="16" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t('notes.createBtn')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        {/* Stats */}
        {notes && notes.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{t('stats.total')}</p>              <p className="mt-2 text-3xl font-bold text-slate-900">{totalNotes}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">{t('stats.done')}</p>              <p className="mt-2 text-3xl font-bold text-emerald-600">{doneNotes}</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {notes?.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 backdrop-blur p-12 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Нотаток ще немає</h2>
            <p className="mt-2 text-sm text-slate-500">{t('notes.empty')}</p>
            <Link
              to="/notes/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
            >
              Створити першу нотатку
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}

        {/* Notes */}
        <div className="grid gap-4">
          {notes?.map((note: any) => {
            const style = getStatusStyle(note.status?.name ?? '');

            return (
              <article
                key={note.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
                        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                        {note.status?.name ?? '—'}
                      </span>
                    </div>

                    <h2 className="truncate text-lg font-semibold text-slate-900">
                      {note.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {note.description || 'Без опису'}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <Link
                      to={`/notes/${note.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <svg width="16" height="16" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {t('actions.edit')}
                    </Link>

                    <button
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        if (window.confirm(t('notes.deleteConfirm'))) deleteNote(note.id);
                      }}
                    >
                      <svg width="16" height="16" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t('actions.delete')}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};