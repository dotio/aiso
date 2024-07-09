import * as React from 'react';
import {Controller, useFormContext } from 'react-hook-form';

import { Combobox, Input, InputBase, Loader, useCombobox } from '@mantine/core';
import classes from './SelectField.module.css'

export interface IOption {
  provider_id: string;
  name: string;
}

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  data: IOption[];
  loading?: boolean;
}>

function SelectField({ name, label, placeholder, data, loading = false, className }: Props) {
  const { setValue, getValues, formState: { errors } } = useFormContext();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedOption: IOption | undefined = getValues(name);

  // TODO: use useFormContext<IFormValues>
  const errorMsg = errors?.[name]
    ? String(errors?.[name]?.message)
    : undefined;

  const handleSelect = (value: string) => {
    const newValue = data.find((item) => item.provider_id === value);
    if (!newValue) {
      return;
    }

    setValue(name, newValue);
  }

  return (
    <Controller name={name} render={({ field })=> (
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          handleSelect(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            {...field}
            component='button'
            type='button'
            pointer
            label={label}
            error={errorMsg}
            rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents='none'
          >
            {selectedOption && selectedOption.name}

            {!selectedOption && (
              <Input.Placeholder>
                {placeholder}
              </Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options className={classes.options}>
            {data.map((item) => (
              <Combobox.Option
                value={item.provider_id}
                key={item.provider_id}
              >
                {item.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    )}/>

  );
}

export default SelectField;
