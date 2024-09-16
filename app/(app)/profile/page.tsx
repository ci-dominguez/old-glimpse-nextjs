import { SignOutButton } from '@clerk/nextjs';

const ProfilePage = () => {
  return (
    <div className='h-screen justify-center items-center flex'>
      <h1>ProfilePage 🙂</h1> <SignOutButton />
    </div>
  );
};

export default ProfilePage;
