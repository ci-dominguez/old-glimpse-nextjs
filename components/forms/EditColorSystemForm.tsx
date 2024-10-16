import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editColorSystemSchema,
  EditColorSystemSchema,
} from '@/utils/validations/editColorSystemSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

interface EditColorSystemFormProps {
  colorSystemId: string;
  initialName: string;
  onSuccess: () => void;
}

const EditColorSystemForm: React.FC<EditColorSystemFormProps> = ({
  colorSystemId,
  initialName,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EditColorSystemSchema>({
    resolver: zodResolver(editColorSystemSchema),
    defaultValues: {
      name: initialName,
    },
  });

  const onSubmit = async (data: EditColorSystemSchema) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/color-systems/${colorSystemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update color system');
      }

      toast({
        title: 'Success',
        description: 'Color system name updated successfully',
      });
      onSuccess();
    } catch (error) {
      console.error('Error updating color system:', error);
      toast({
        title: 'Error',
        description: 'Failed to update color system name',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color System Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Enter new name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Name'}
        </Button>
      </form>
    </Form>
  );
};

export default EditColorSystemForm;
