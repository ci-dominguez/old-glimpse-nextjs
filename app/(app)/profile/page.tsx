'use client';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
  const { user } = useUser();

  return user ? (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-5 rounded-xl text-center items-center bg-off'>
        <Image
          src={user.imageUrl}
          alt={`${user.firstName}'s profile`}
          width='100'
          height='100'
          className='rounded-full'
        />
        <h1 className='text-4xl font-bold'>{user?.firstName}</h1>
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off text-center'>
        <h3 className='text-xl font-bold text-on underline'>
          <Link href='/color-systems'>View Your color systems</Link>
        </h3>
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off text-white text-center'>
        <SignOutButton>
          <span className='px-4 py-2 w-full text-md self-start mx-auto bg-red-600 font-bold rounded cursor-pointer'>
            {' '}
            Sign Out
          </span>
        </SignOutButton>
      </section>
    </main>
  ) : (
    <>User not found...</>
  );
};

export default ProfilePage;
