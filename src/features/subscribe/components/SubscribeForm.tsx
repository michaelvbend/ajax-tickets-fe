import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

function SubscribeForm() {
  const [email, setEmail] = useState('');

  const mutation = useMutation({
    mutationFn: (newEmail) => {
      const API_URL = 'http://localhost:8080/subscribe';
      return fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      });
    },
  });

  const handleSubmit = (e) => {
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
