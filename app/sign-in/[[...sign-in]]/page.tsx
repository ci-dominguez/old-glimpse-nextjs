import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className='flex justify-center'>
      <SignIn />
    </div>
  );
};

export default SignInPage;
