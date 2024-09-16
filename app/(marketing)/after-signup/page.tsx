'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { subscriptionDetails as subs } from '@/utils/subscriptionDetails';

const AfterSignupPage = () => {
  const [redirecting, setRedirecting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserIdAndRedirect = async () => {
      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user ID');
        }
        const data = await response.json();
        setUserId(data.id);

        const storedPlan = localStorage.getItem('selectedPlan');
        if (storedPlan) {
          const { name, billingPeriod } = JSON.parse(storedPlan);
          const titleCaseName =
            name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
          const selectedPlan = subs.find((plan) => plan.name === titleCaseName);
          if (selectedPlan) {
            const paymentLink =
              billingPeriod === 'YEARLY'
                ? selectedPlan.yearlyLink
                : selectedPlan.monthlyLink;
            if (paymentLink) {
              setRedirecting(true);
              console.log('data.id obtained: ', data.id);
              const linkWithDataId = `${paymentLink}?client_reference_id=${data.id}`;
              console.log('paymentLink with data.id: ', linkWithDataId);
              window.location.href = linkWithDataId;
            }
          }
        } else {
          router.push('/profile');
        }
      } catch (error) {
        console.error('Error fetching user ID or redirecting:', error);
        router.push('/profile');
      }
    };

    fetchUserIdAndRedirect();
  }, [router, userId]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md text-center'>
        <h1 className='text-2xl font-bold mb-4'>Thank you for signing up!</h1>
        <p className='mb-6'>
          Your account has been created. You will be redirected to the payment
          page in a few seconds.
        </p>
        {redirecting && (
          <p className='text-sm text-gray-500'>
            If you are not redirected,{' '}
            <a href='#' className='text-blue-500 underline'>
              click here
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default AfterSignupPage;
