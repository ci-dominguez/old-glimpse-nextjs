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
      <section className='flex flex-col m-2 items-center pt-24 lg:pt-32 bg-periwinkle rounded-md lg:m-4 px-6 lg:px-16 pb-12 lg:pb-20 min-h-screen'>
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
