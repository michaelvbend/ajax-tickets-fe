import { useState } from 'react';
import useFetchMatches from '../../../api/hooks/useFetchMatches';
import useSubscribeToMatch from '../../../api/hooks/useSubscribeToMatch';

interface Match {
  homeTeam: string;
  awayTeam: string;
  soldOut: boolean;
  matchLink: string;
}

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('');
  const { data } = useFetchMatches(Infinity);

  const mutation = useSubscribeToMatch(email, selectedMatch);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          Enter email
        </label>
        <input
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='match'
          className='block text-sm font-medium text-gray-700'
        >
          Select Match
        </label>
        <select
          name='match'
          value={selectedMatch}
          onChange={(e) => setSelectedMatch(e.target.value)}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
        >
          <option value='' disabled>
            Select a match
          </option>
          {data?.matches.map((match: Match) => (
            <option key={match.awayTeam} value={match.awayTeam}>
              {match.awayTeam}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
        >
          Subscribe
        </button>
      </div>
      {mutation.isPending && <p>Loading...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Subscribed successfully!</p>}
    </form>
  );
}

export default SubscribeForm;
