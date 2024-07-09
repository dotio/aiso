import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { Textarea } from '@mantine/core';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}>

function TextField({ name, label, placeholder, required = false, className }: Props) {
  const { formState: { errors } } = useFormContext();

  // TODO: use useFormContext<IFormValues>
  const errorMsg = errors?.[name]
    ? String(errors?.[name]?.message)
    : undefined;

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Textarea
          {...field}
          required={required}
          label={label}
          placeholder={placeholder}
          error={errorMsg}
        />
      )}
    />
  );
}

export default TextField;
