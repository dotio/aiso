import * as React from 'react';
import { UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from 'react-hook-form';
import { Flex } from '@mantine/core';
import cx from 'clsx';

import classes from '@web/pages/Assistants/components/AssistantsForm/Channel/Telegram/Telegram.module.css';
import TemplateField from '@web/pages/Assistants/components/AssistantsForm/Fields/ChannelField';
import InputField from '@web/components/Forms/InputField';
import {
  ASSISTANTS_FIELDS,
  CHANNEL_FIELDS,
  WHATSAPP_FIELDS
} from '@web/pages/Assistants/components/AssistantsForm';
import { IAssistantChannelTemplate } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  templates: IAssistantChannelTemplate[];
  index: number;
  fieldsLength: number;
  name: string;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<any, any>;
}>;

function WhatsApp({
  className,
  templates,
  index,
  name,
  remove,
  update,
  fieldsLength,
  ...rest
}: Props) {
  const { setValue, watch } = useFormContext();
  const { settings, id } = rest as any;
  const data = watch(name);

  React.useEffect(() => {
    if (!settings) {
      return;
    }

    setValue(
      `${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.SUBJECT_ID}`,
      settings.subject_id
    );
    setValue(
      `${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.CASCADE_ID}`,
      settings.cascade_id
    );
    setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.API_KEY}`, settings.api_key);
  }, [settings, setValue]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    setValue(`${name}.${CHANNEL_FIELDS.ID}`, id);
  }, [id, setValue]);

  const handleDelete = () => {
    const updatedItem = {
      ...data,
      _destroy: true
    };
    if (id) {
      if (fieldsLength <= 1) {
        return;
      }
      update(index, updatedItem);
    } else {
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.SUBJECT_ID}`, '');
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.CASCADE_ID}`, '');
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.API_KEY}`, '');
      remove(index);
    }
  };

  return (
    <Flex direction="column" gap="md">
      <Flex className={cx(classes.root, className)} gap="md">
        <TemplateField
          {...rest}
          label="Канал интеграции"
          placeholder="Выберите канал для интеграции"
          name={name}
          templates={templates}
          removeChannel={handleDelete}
        />

        <InputField
          className={classes.input}
          name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.SUBJECT_ID}`}
          label="ID канала"
          placeholder="Пример: 1112223334"
        />
        <InputField
          className={classes.input}
          name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.CASCADE_ID}`}
          label="ID каскада"
          placeholder="Пример: 1112223334"
        />
      </Flex>
      <InputField
        className={classes.input}
        name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${WHATSAPP_FIELDS.API_KEY}`}
        label="API key"
        placeholder="Пример: a1a111a1-1a11-1aaa-11a1-1a11a11a1aa1"
      />
    </Flex>
  );
}

export default WhatsApp;
