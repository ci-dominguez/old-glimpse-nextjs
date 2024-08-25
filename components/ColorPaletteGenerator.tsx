'use client';

import { useState } from 'react';
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
import { Card, CardContent } from './ui/card';

const MAX_PROMPT_LENGTH = 200;

//Define schema + restrictions for fe validation
const formSchema = z.object({
  prompt: z
    .string()
    .min(1, { message: 'Write something before generating a color palette!' })
    .max(MAX_PROMPT_LENGTH, {
      message: `Prompt cannot exceed ${MAX_PROMPT_LENGTH} characters.`,
    }),
});

const ColorPaletteGenerator = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const resp = await fetch('/api/generate-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: values.prompt }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || `Server error: ${resp.status}`);
      }

      setPalette(data.colors);
    } catch (error) {
      console.error('Error generating palette:', error);
      form.setError('prompt', {
        type: 'manual',
        message:
          error instanceof Error
            ? error.message
            : 'Failed to generate palette. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-1/2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col items-center text-center"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description Of Your Idea</FormLabel>
                <FormControl>
                  <Input
                    placeholder="My company Acme provide elegant solutions ..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the mood, industry, or purpose of your idea.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {loading ? '🔮🎨 Mixing colors...' : 'Create My Palette 🎨✨'}
          </Button>
        </form>
      </Form>

      {palette.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {palette.map((color, index) => (
            <Card key={index}>
              <CardContent>
                <div
                  className="w-full h-20 rounded"
                  style={{ backgroundColor: color }}
                />
                <p className="text-center mt-2">{color}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPaletteGenerator;
