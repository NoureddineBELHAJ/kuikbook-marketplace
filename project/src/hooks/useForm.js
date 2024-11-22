import { useForm as useReactHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

export function useForm(schema, options = {}) {
  const form = useReactHookForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    ...options
  });

  const handleSubmit = (onSubmit) => {
    return form.handleSubmit(async (data) => {
      try {
        await onSubmit(data);
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error(error.message || 'An error occurred while submitting the form');
        throw error;
      }
    });
  };

  return {
    ...form,
    handleSubmit
  };
}