import { useMutation } from '@tanstack/react-query';

const API_URL = 'https://goldfish-app-mpxfi.ondigitalocean.app/api/subscribe';

const postSubscriptionRequest = (newEmail: string, selectedMatch: string) => {
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
};

const useSubscribeToMatch = (newEmail: string, selectedMatch: string) => {
  return useMutation({
    mutationFn: () => postSubscriptionRequest(newEmail, selectedMatch),
  });
};

export default useSubscribeToMatch;
