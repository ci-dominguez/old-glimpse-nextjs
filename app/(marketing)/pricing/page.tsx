'use client';
import { useState } from 'react';
import Blob from '@/components/icons/blob';
import { Button } from '@/components/ui/button';
import { subscriptionDetails as subs } from '@/utils/subscriptionDetails';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(true);
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Design with Glimpse</h1>
          <p className='font-medium'>
            Maybe the simplest thing about Glimpse is its pricing &mdash; full
            offer transparency and no hidden fees.
          </p>
        </div>
      </section>
      <section className='flex flex-col m-2 px-4 py-8 space-y-6 rounded-xl bg-off'>
        <div className='flex items-center justify-center space-x-2 my-6'>
          <Label
            htmlFor='subscription-toggle'
            className={`text-md ${!isYearly ? 'font-bold' : ''}`}
          >
            Bill monthly
          </Label>
          <Switch
            id='subscription-toggle'
            checked={isYearly}
            onCheckedChange={() => setIsYearly(!isYearly)}
          />
          <Label
            htmlFor='subscription-toggle'
            className={`text-md ${isYearly ? 'font-bold' : ''}`}
          >
            Bill yearly
          </Label>
        </div>
        {subs.map((sub) => {
          return (
            <div
              key={sub.name}
              className={`flex flex-col px-6 py-12 rounded-xl bg-white ${
                sub.name === 'Pro' ? 'border-2 border-[#21c6fc]' : ''
              }`}
            >
              <div className='flex flex-col space-y-6'>
                <div className='space-y-2'>
                  <h2
                    className={`text-6xl font-bold ${
                      sub.name === 'Pro'
                        ? 'text-[#21c6fc]'
                        : sub.name === 'Max'
                        ? 'text-[#5432fc]'
                        : ''
                    }`}
                  >
                    {sub.name}
                  </h2>
                  <p>{sub.description}</p>
                </div>
                <div>
                  <h3 className='text-4xl font-bold'>
                    ${isYearly ? sub.yearlyPrice : sub.monthlyPrice}
                  </h3>
                  <span className='opacity-70'>
                    per month, billed {isYearly ? 'yearly' : 'monthly'}
                  </span>
                  <div className='flex items-center space-x-2 mt-2'>
                    <span className='text-md font-bold'>Billed</span>
                    <Label
                      htmlFor='subscription-toggle'
                      className={`text-sm ${!isYearly ? 'font-bold' : ''}`}
                    >
                      monthly
                    </Label>
                    <Switch
                      id='subscription-toggle'
                      checked={isYearly}
                      onCheckedChange={() => setIsYearly(!isYearly)}
                    />
                    <Label
                      htmlFor='subscription-toggle'
                      className={`text-sm ${isYearly ? 'font-bold' : ''}`}
                    >
                      yearly
                    </Label>
                  </div>
                </div>
              </div>
              <ul className='mt-10'>
                {sub.features.map((ft) => (
                  <li
                    key={ft}
                    className='grid grid-cols-[24px_1fr] gap-2 items-start'
                  >
                    <div className='flex items-center justify-center h-6'>
                      <Blob
                        className={`size-3 flex-shrink-0 fill-black ${
                          sub.name === 'Pro'
                            ? 'fill-[#21c6fc]'
                            : sub.name === 'Max'
                            ? 'fill-[#5432fc]'
                            : ''
                        }`}
                      />
                    </div>
                    <p className='text-md'>{ft}</p>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-10 ${
                  sub.name === 'Pro'
                    ? 'bg-[#21c6fc]'
                    : sub.name === 'Max'
                    ? 'bg-[#5432fc]'
                    : ''
                }`}
              >
                {sub.name === 'Basic'
                  ? 'Get started for free'
                  : sub.name === 'Pro'
                  ? 'Upgrade to Pro'
                  : 'Get full access'}
              </Button>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default PricingPage;
