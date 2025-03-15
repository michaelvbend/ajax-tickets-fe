import { useQuery } from '@tanstack/react-query';
import MatchList from '../components/MatchList';

const matches = [
  {
    homeTeam: 'Ajax',
    awayTeam: 'PSV',
    soldOut: true,
    matchLink: '#',
  },
  {
    homeTeam: 'Ajax',
    awayTeam: 'Utrecht',
    soldOut: false,
    matchLink: '#',
  },
  {
    homeTeam: 'AZ',
    awayTeam: 'Twente',
    soldOut: false,
    matchLink: '#',
  },
];

function MatchWidgetScreen() {
  const API_URL = 'http://localhost:8080/matches';

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
