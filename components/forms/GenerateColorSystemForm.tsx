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
import { Input } from '@/components/ui/input';
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
    <div className='space-y-4 w-full max-w-md'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 flex flex-col items-center text-center'
        >
          <FormField
            control={form.control}
            name='prompt'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description Of Your Idea</FormLabel>
                <FormControl>
                  <Input
                    placeholder='My company Acme provides elegant solutions ...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the mood, industry, or purpose of your idea.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Mode</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex space-x-4'
                  >
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <RadioGroupItem value='light' />
                      </FormControl>
                      <FormLabel className='font-normal'>Light</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <RadioGroupItem value='dark' />
                      </FormControl>
                      <FormLabel className='font-normal'>Dark</FormLabel>
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
    </div>
  );
};

export default GenerateColorSystemForm;
