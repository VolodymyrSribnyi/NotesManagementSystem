import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { useGetStatuses } from '../api/useStatuses';

const noteSchema = z.object({
  name: z.string().min(3, 'Мінімум 3 символи').max(50, 'Максимум 50 символів'),
  description: z.string().min(5, 'Мінімум 5 символів'),
  statusId: z.string().min(1, 'Оберіть статус'),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteFormProps {
  initialData?: { name: string; description: string; status?: { id: string } };
  onSubmit: (data: NoteFormValues) => void;
  isLoading?: boolean;
}

export const NoteForm = ({ initialData, onSubmit, isLoading }: NoteFormProps) => {
  const { t } = useTranslation();
  const { data: statuses, isLoading: statusesLoading } = useGetStatuses();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      statusId: initialData?.status?.id ?? '',
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {initialData ? t('form.editTitle') : t('form.createTitle')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {initialData ? 'Редагування нотатки' : 'Створіть нову нотатку'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {t('form.nameLabel')}
              </label>
              <input
                type="text"
                {...register('name')}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 outline-none
                  ${errors.name
                    ? 'border-red-300 focus:ring-2 focus:ring-red-400'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                  }`}
                placeholder={t('form.namePlaceholder')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {t('form.descLabel')}
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm resize-none transition-all duration-200 outline-none
                  ${errors.description
                    ? 'border-red-300 focus:ring-2 focus:ring-red-400'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                  }`}
                placeholder={t('form.descPlaceholder')}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                {t('form.statusLabel')}
              </label>
              <select
                {...register('statusId')}
                disabled={statusesLoading}
                className={`w-full rounded-xl border px-3 py-2.5 text-sm bg-white transition-all duration-200 outline-none
                  ${errors.statusId
                    ? 'border-red-300 focus:ring-2 focus:ring-red-400'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                  }`}
              >
                <option value="">{t('form.selectStatus')}</option>
                {statuses?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.statusId && (
                <p className="text-red-500 text-xs mt-1">{errors.statusId.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">

              <button
                type="button"
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
              >
                {t('form.cancel')}
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {initialData ? t('form.save') : t('form.create')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};