import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput } from '@mantine/core';
import cx from 'clsx';

import classes from './InputField.module.css'

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}>

function InputField({ name, label, required = false, className, placeholder, type }: Props) {
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
          type={type}
          className={cx(classes.root, className)}
        />
      )}
    />
  );
}

export default InputField;
