'use client';
import { SignUp } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

const SignUpPage = () => {
  const [redirectUrl, setRedirectUrl] = useState('/profile');

  useEffect(() => {
    const storedRedirect = localStorage.getItem('signUpRedirect');

    if (storedRedirect) {
      setRedirectUrl(storedRedirect);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const paramRedirect = urlParams.get('redirect');

      if (paramRedirect) {
        localStorage.setItem('signUpRedirect', paramRedirect);
        setRedirectUrl(paramRedirect);
      }
    }
    console.log('Redirect URL:', redirectUrl);
  }, [redirectUrl]);

  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Sign Up</h1>
          <p className='font-medium'>
            Sign up for free to get started with Glimpse.
          </p>
        </div>
      </section>
      <section className='flex flex-col m-2 items-center'>
        <SignUp
          path='/sign-up'
          routing='path'
          signInUrl='/sign-in'
          forceRedirectUrl={redirectUrl}
        />
      </section>
    </main>
  );
};

export default SignUpPage;
