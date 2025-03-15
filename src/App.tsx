import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import MatchWidgetScreen from './features/match-widget/screens/MatchWidgetScreen';
import SubscribeScreen from './features/subscribe/screens/SubscribeScreen';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex flex-col justify-center items-center min-h-screen p-4'>
        <h1 className='text-4xl font-bold my-8 text-center text-white'>
          Welcome to Ajax Ticket Alerts
        </h1>
        <div className='flex flex-col md:flex-row w-full max-w-4xl'>
          <div className='w-full md:w-1/2 p-4'>
            <MatchWidgetScreen />
          </div>
          <div className='w-full md:w-1/2 p-4'>
            <SubscribeScreen />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
