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
    <div className='flex justify-center'>
      <SignUp
        path='/sign-up'
        routing='path'
        signInUrl='/sign-in'
        forceRedirectUrl={redirectUrl}
      />
    </div>
  );
};

export default SignUpPage;
