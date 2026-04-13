import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';
import { useGetStatuses } from '../api/useStatuses';
import { getStatusStyle } from '../utils/statusHelper';

const noteSchema = z.object({
  name: z.string().min(3, 'Мінімум 3 символи').max(50, 'Максимум 50 символів'),
  description: z.string().min(5, 'Мінімум 5 символів'),
  statusId: z.string().min(1, 'Оберіть статус'),
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteFormProps {
  initialData?: { name: string; description: string; status?: { id: string; name: string } };
  onSubmit: (data: NoteFormValues) => void;
  isLoading?: boolean;
}

export const NoteForm = ({ initialData, onSubmit, isLoading }: NoteFormProps) => {
  const { t } = useTranslation();
  const { data: statuses, isLoading: statusesLoading } = useGetStatuses();

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      statusId: initialData?.status?.id ?? '',
    },
  });

  const selectedStatusId = watch('statusId');
  const selectedStatus = statuses?.find(s => s.id === selectedStatusId);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{t('form.nameLabel')}</label>
        <input
          type="text"
          {...register('name')}
          placeholder={t('form.namePlaceholder')}
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
        />
        {errors.name && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{t('form.descLabel')}</label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder={t('form.descPlaceholder')}
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
        />
        {errors.description && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <svg width="16" height="16" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1V10a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{t('form.statusLabel')}</label>
        <div className="relative">
          <Controller
            name="statusId"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                disabled={statusesLoading}
                className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none appearance-none transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${errors.statusId ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200 bg-white hover:border-gray-300 text-gray-900'}`}
              >
                <option value="">{t('form.selectStatus')}</option>
                {statuses?.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            {selectedStatus ? (
              <span className={`w-2 h-2 rounded-full ${getStatusStyle(selectedStatus.name).dot}`} />
            ) : (
              <svg width="16" height="16" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>
        {errors.statusId && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1V10a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
            {errors.statusId.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
        <button
          type="button"
          className="text-sm font-medium text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-150"
        >
          {t('form.cancel')}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-150"
        >
          {isLoading && (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          )}
          {initialData ? t('form.save') : t('form.create')}
        </button>
      </div>
    </form>
  );
};