import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { apiClient } from './client';

interface UpdateNoteParams{
    id: string;
    updatedNote: {name: string, description: string, status: number};
}

const fetchNotes = async () => {
  const response = await apiClient.get('/Notes');
  if (!response.data) {
    throw new Error('Data is undefined');
  }
  return response.data;
};

const fetchNote = async (id:string) => {
    const response = await apiClient.get(`/Notes/${id}`);
    if (!response.data) {
    throw new Error('Data is undefined');
    }
    return response.data;
}

const postNote = async (newNote: { name: string, description: string}) => {
    const response = await apiClient.post('/Notes',newNote); 
    return response.data;
};

const putNote = async ({id, updatedNote}: UpdateNoteParams) => {
    const response = await apiClient.put(`/Notes/${id}`,updatedNote);
    return response.data;
};

const deleteNote = async(id:string) => {
    const response = await apiClient.delete(`/Notes/${id}`);
    return response.data;
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
        },  
    )
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: putNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
        },  
    )
}
export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
        },  
    )
};

export const useGetNotes = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
    });
};

export const useGetNote = (noteId:string) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['notes',noteId],
        queryFn: () => fetchNote(noteId),
        initialData: () => {
            const allNotes = queryClient.getQueryData<any[]>(['notes']);
            const note = allNotes?.find((n) => n.id === noteId);
            return note;
        }
    });
}
