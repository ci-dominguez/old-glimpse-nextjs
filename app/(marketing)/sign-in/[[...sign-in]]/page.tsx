import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Hello 👋</h1>
          <p className='font-medium'>Sign in to Glimpse below.</p>
        </div>
      </section>
      <section className='flex flex-col m-2 items-center'>
        <SignIn />
      </section>
    </main>
  );
};

export default SignInPage;
