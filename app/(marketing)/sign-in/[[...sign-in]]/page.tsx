import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 items-center pt-24 lg:pt-32 bg-periwinkle rounded-md lg:m-4 px-6 lg:px-16 pb-12 lg:pb-20 min-h-screen'>
        <SignIn />
      </section>
    </main>
  );
};

export default SignInPage;
