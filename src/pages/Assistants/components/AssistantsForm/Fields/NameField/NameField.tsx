import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { TextInput } from '@mantine/core';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}>

function NameField({ name, label, required = false, placeholder, className }: Props) {
  const { formState: { errors } } = useFormContext();

  // TODO: use useFormContext<IFormValues>
  const errorMsg = errors?.[name]
    ? String(errors?.[name]?.message)
    : undefined;

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextInput
          {...field}
          label={label}
          placeholder={placeholder}
          required={required}
          error={errorMsg}
        />
      )}
    />
  );
}

export default NameField;
