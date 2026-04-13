import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const noteSchema = z.object({
    name: z.string().min(3,'Title should contain at least 3 characters').max(50, 'Title is too long'),
    description: z.string().min(5,'Description is too short'),
    status: z.number().optional()
});

type NoteFormValues = z.infer<typeof noteSchema>;

interface NoteFormProps {
    initialData?: {
        name: string;
        description: string;
        status?: number;
    };
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export const NoteForm = ({ initialData, onSubmit, isLoading }: NoteFormProps) => {
    const{
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<NoteFormValues>({
        resolver: zodResolver(noteSchema),
        values: initialData,
        defaultValues: {name: '',description: ''}
    });
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title of the note
          </label>
          <input 
            type="text"
            {...register('name')}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter a title..."
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea 
            {...register('description')}
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Add details..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status of the note
          </label>
          <select 
            {...register('status', {valueAsNumber: true})}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-3 mt-4">
          <button 
            type="button"
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {initialData ? 'Save changes' : 'Create a note'}
          </button>
        </div>

      </form>
    </div>
  );
};