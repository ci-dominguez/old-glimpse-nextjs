'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { colorConverterSchema } from '@/utils/validations/colorConverterSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { hexToRgb, rgbToOkhsl } from '@/utils/ops/colorConversionOps';

const ConvertColorsForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof colorConverterSchema>>({
    resolver: zodResolver(colorConverterSchema),
    defaultValues: {
      hex_code: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof colorConverterSchema>) => {
    setLoading(true);
    setError(null);

    let hexCode = values.hex_code;
    if (!hexCode.startsWith('#')) {
      hexCode = `#${hexCode}`;
    }

    const rgb = hexToRgb(hexCode);
    const okhsl = rgbToOkhsl(rgb);
    const okhslString = `okHsl(${Math.round(okhsl.h!)} ${Math.round(
      okhsl.s * 100
    )}% ${Math.round(okhsl.l * 100)}%)`;

    console.log('OKHSL:', okhslString);

    try {
      const resp = await fetch('/api/colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ okhslColor: okhslString }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || 'Failed to convert color');
      }

      if (data.id) {
        router.push(`/color-swatches/${data.id}`);
      } else {
        throw new Error('Color ID not returned');
      }
    } catch (error) {
      console.error('Error converting color:', error);
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
            name='hex_code'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>
                  <h2 className='text-2xl font-bold'>Enter your hex code</h2>
                </FormLabel>
                <FormControl>
                  <Input placeholder='#39ff14' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading}>
            {loading ? 'Mixing...🔮' : 'Generate Colors 🎨'}
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

export default ConvertColorsForm;
