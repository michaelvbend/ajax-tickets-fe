import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

interface Match {
  homeTeam: string;
  awayTeam: string;
  soldOut: boolean;
  matchLink: string;
}

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [selectedMatch, setSelectedMatch] = useState('');
  const API_URL = 'https://goldfish-app-mpxfi.ondigitalocean.app/api/matches';

  const fetchAvailableMatches = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchAvailableMatches,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: (newEmail: string) => {
      const API_URL =
        'https://goldfish-app-mpxfi.ondigitalocean.app/api/subscribe';
      return fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail, matchAgainst: selectedMatch }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('User already subscribed to match!');
        }
        return response;
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(email);
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
