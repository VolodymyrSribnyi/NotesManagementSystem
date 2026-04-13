import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { apiClient } from './client';

interface NotePayload {
  name: string;
  description: string;
  statusId: string;
}

interface UpdateNoteParams {
  id: string;
  updatedNote: NotePayload;
}

const fetchNotes = async () => (await apiClient.get('/Notes')).data;
const fetchNote = async (id: string) => (await apiClient.get(`/Notes/${id}`)).data;
const postNote = async (note: NotePayload) => (await apiClient.post('/Notes', note)).data;
const putNote = async ({ id, updatedNote }: UpdateNoteParams) =>
  (await apiClient.put(`/Notes/${id}`, updatedNote)).data;
const deleteNote = async (id: string) => (await apiClient.delete(`/Notes/${id}`)).data;

export const useGetNotes = () =>
  useQuery({ queryKey: ['notes'], queryFn: fetchNotes });

export const useGetNote = (noteId: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['notes', noteId],
    queryFn: () => fetchNote(noteId),
    initialData: () =>
      queryClient.getQueryData<any[]>(['notes'])?.find((n) => n.id === noteId),
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
};
