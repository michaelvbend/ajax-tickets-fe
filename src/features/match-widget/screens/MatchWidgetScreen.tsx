import MatchList from '../components/MatchList';
import useFetchMatches from '../../../api/hooks/useFetchMatches';

function MatchWidgetScreen() {
  const { data, error, isLoading } = useFetchMatches();

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
