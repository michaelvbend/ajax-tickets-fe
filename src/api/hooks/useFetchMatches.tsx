import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://goldfish-app-mpxfi.ondigitalocean.app/api/matches';

const fetchAvailableMatches = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const useFetchMatches = (staleTime?: number) => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: fetchAvailableMatches,
    staleTime: staleTime || 0,
  });
};

export default useFetchMatches;
