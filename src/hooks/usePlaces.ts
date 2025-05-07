import { useQuery } from '@tanstack/react-query';
import { placesAPI } from '../api/client';

export const usePlaces = (params?: any) => {
  return useQuery({
    queryKey: ['places', params],
    queryFn: () => placesAPI.getPlaces(params),
    select: (response) => response.data.data,
  });
};

export const usePlace = (id: string | undefined) => {
  return useQuery({
    queryKey: ['place', id],
    queryFn: () => placesAPI.getPlace(id!),
    select: (response) => response.data.data,
    enabled: !!id,
  });
};