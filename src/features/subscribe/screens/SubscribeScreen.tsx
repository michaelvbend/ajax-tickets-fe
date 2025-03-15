import SubscribeForm from '../components/SubscribeForm';

function SubscribeScreen() {
  return (
    <div className='bg-white rounded-lg p-8 shadow-lg max-w-md mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Get Notified!</h1>
      <p className='text-gray-700 mb-6'>
        Would you like to be notified when new tickets become available? Simply
        enter your email, and we'll notify you as soon as new tickets are
        available!
      </p>
      <SubscribeForm />
    </div>
  );
}

export default SubscribeScreen;
