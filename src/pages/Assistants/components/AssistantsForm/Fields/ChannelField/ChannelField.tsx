import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';
import { Combobox, InputBase, useCombobox, Input } from '@mantine/core';

import Item from './Item';
import classes from './ChannelField.module.css';

import { IAssistantChannelTemplate } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string;
  name: string;
  label?: string;
  placeholder?: string;
  templates?: IAssistantChannelTemplate[];
  removeChannel: () => void;
}>;

function TemplateField({ name, label, placeholder, className, templates, removeChannel }: Props) {
  const {
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });

  const handleSelect = (value: string) => {
    const newValue = templates && templates.find((item) => item.tag === value);
    if (!newValue) {
      return;
    }
    setValue(name, newValue);
  };

  React.useEffect(() => {
    if (!templates) {
      return;
    }

    const newValue = templates && templates.find((item) => item.tag === getValues(name).tag);
    if (!newValue) {
      return;
    }
    setValue(name, newValue);
  }, []);

  const errorMsg = errors?.[name] ? String(errors?.[name]?.message) : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
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
              className={classes.input}
              component="button"
              type="button"
              pointer
              rightSection={<IconX className={classes.icon} onClick={removeChannel} />}
              onClick={() => combobox.toggleDropdown()}
              multiline
              label={label}
              error={errorMsg}
            >
              {field.value && <Item {...field.value} />}
              {!field.value && <Input.Placeholder>{placeholder}</Input.Placeholder>}
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {templates &&
                templates.map((template) => (
                  <Combobox.Option value={template.tag} key={template.tag}>
                    <Item {...template} />
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      )}
    />
  );
}

export default TemplateField;
