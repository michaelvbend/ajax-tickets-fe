import { useQuery } from '@tanstack/react-query';
import MatchList from '../components/MatchList';

function MatchWidgetScreen() {
  const API_URL = 'https://goldfish-app-mpxfi.ondigitalocean.app/api/matches';

  const fetchAvailableMatches = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchAvailableMatches,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Available Matches</h1>
      <MatchList matchList={data.matches} />
    </div>
  );
}

export default MatchWidgetScreen;
