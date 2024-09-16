'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactMsgSchema,
  ContactFormData,
} from '@/utils/validations/contactMsgSchema';
import { Button } from '../ui/button';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactMsgSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col bg-white rounded-lg p-5 space-y-4'
    >
      <div className='grid grid-cols-2 w-full gap-3'>
        <div className='w-full space-y-2'>
          <label htmlFor='first_name' className='text-sm font-bold'>
            First Name*
          </label>
          <input
            {...register('first_name')}
            id='first_name'
            type='text'
            className='w-full p-2 border-[1px] border-gray-500 rounded-md'
          />
          {errors.first_name && (
            <span className='text-red-500 text-sm mt-1'>
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div className='w-full space-y-2'>
          <label htmlFor='last_name' className='text-sm font-bold'>
            Last Name*
          </label>
          <input
            {...register('last_name')}
            id='last_name'
            type='text'
            className='w-full p-2 border-[1px] border-gray-500 rounded-md'
          />
          {errors.last_name && (
            <span className='text-red-500 text-sm mt-1'>
              {errors.last_name.message}
            </span>
          )}
        </div>
      </div>

      <div className='w-full space-y-2'>
        <label htmlFor='email' className='text-sm font-bold'>
          Email*
        </label>
        <input
          {...register('email')}
          id='email'
          type='email'
          className='w-full p-2 border-[1px] border-gray-500 rounded-md'
        />
        {errors.email && (
          <span className='text-red-500 text-sm mt-1'>
            {errors.email.message}
          </span>
        )}
      </div>

      <p className='text-sm font-bold'>
        Tell us more about what led you to Glimpse
      </p>

      <div className='space-y-2'>
        <label htmlFor='message' className='text-sm font-bold'>
          Message*
        </label>
        <textarea
          {...register('message')}
          id='message'
          rows={4}
          className='w-full p-2 border-[1px] border-gray-500 rounded-md'
        />
        {errors.message && (
          <span className='text-red-500 text-sm mt-1'>
            {errors.message.message}
          </span>
        )}
      </div>

      <Button>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>

      {submitError && (
        <p className='text-red-500 text-sm mt-1'>{submitError}</p>
      )}
      {submitSuccess && (
        <p className='text-green-500 text-sm mt-1'>
          Thank you for your message. We&apos;ll get back to you soon!
        </p>
      )}
    </form>
  );
};

export default ContactForm;
