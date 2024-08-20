'use client';
import { type Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { Textarea } from '@/components/ui/textarea';

type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
};

const TextField = <T extends FieldValues>({
  control,
  name,
  label = 'Label', // Default label text
  placeholder = 'Enter value', // Default placeholder text,
  type = 'text',
}: TextFieldProps<T> & { type?: HTMLInputTypeAttribute }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              step='0.01'
              placeholder={placeholder}
              {...field}
              min='1'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TextArea = <T extends FieldValues>({
  control,
  name,
  label = 'Label', // Default label text
  placeholder = 'Enter value', // Default placeholder text
}: TextFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              value={field.value ?? ''}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormFieldWrapper = ({ children }: any) => children;

FormFieldWrapper.TextField = TextField;
FormFieldWrapper.TextArea = TextArea;

export { FormFieldWrapper };
