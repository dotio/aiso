import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  options: string[];
  required?: boolean;
}>;

function SelectField({
  name,
  label,
  className,
  placeholder,
  defaultValue,
  options
}: Props) {
  const {
    formState: { errors }
  } = useFormContext();
  const [open, setOpen] = React.useState(false);

  // TODO: use useFormContext<IFormValues>
  const errorMsg = errors?.[name] ? String(errors?.[name]?.message) : undefined;

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Select
          {...field}
          label={label}
          error={errorMsg}
          className={className}
          defaultValue={defaultValue}
          placeholder={placeholder}
          data={options}
          rightSection={
            open ? (
              <IconChevronUp size={24} color="#B0BEC5" />
            ) : (
              <IconChevronDown size={24} color="#B0BEC5" />
            )
          }
          onDropdownOpen={() => setOpen(true)}
          onDropdownClose={() => setOpen(false)}
        />
      )}
    />
  );
}

export default SelectField;
