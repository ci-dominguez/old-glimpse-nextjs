'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

const MAX_PROMPT_LENGTH = 200;

const formSchema = z.object({
  prompt: z
    .string()
    .min(20, { message: 'Write something before generating a color system!' })
    .max(MAX_PROMPT_LENGTH, {
      message: `Prompt cannot exceed ${MAX_PROMPT_LENGTH} characters.`,
    }),
  mode: z.enum(['light', 'dark']),
});

const GenerateColorSystemForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      mode: 'light',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch('/api/color-systems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(
          data.error || data.message || 'Failed to generate color system'
        );
      }

      if (data.colorSystemId) {
        router.push(`/color-systems/${data.colorSystemId}`);
      } else {
        throw new Error('Color system ID not returned');
      }
    } catch (error) {
      console.error('Error generating color system:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 flex flex-col'
        >
          <FormField
            control={form.control}
            name='prompt'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <h2 className='text-2xl font-bold'>
                    Let&apos;s bring your idea to life 💡
                  </h2>
                </FormLabel>
                <FormDescription className='text-lg font-medium text-on'>
                  Describe the mood, industry, or purpose of your idea.
                </FormDescription>
                <FormControl>
                  <Textarea
                    className='font-normal text-md focus:outline-none active:outline-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='My app Acme is an intuitive tool that provides users...'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h3 className='text-lg font-medium text-on'>
                    Choose a color theme
                  </h3>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex space-x-4'
                  >
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='light' />
                      </FormControl>
                      <FormLabel className='font-normal'>Light Mode</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='dark' />
                      </FormControl>
                      <FormLabel className='font-normal'>Dark Mode</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            {loading ? 'Mixing...🔮' : 'Create my colors 🎨'}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant='destructive'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </section>
  );
};

export default GenerateColorSystemForm;
