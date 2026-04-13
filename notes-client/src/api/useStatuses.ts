import { useQuery } from '@tanstack/react-query';
import { apiClient } from './client';

export interface StatusDTO {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const useGetStatuses = () =>
  useQuery<StatusDTO[]>({
    queryKey: ['statuses'],
    queryFn: async () => (await apiClient.get('/Statuses')).data,
    staleTime: Infinity,
  });