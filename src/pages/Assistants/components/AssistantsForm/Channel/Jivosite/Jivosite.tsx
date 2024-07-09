import * as React from 'react';
import cx from 'clsx';
import { Flex } from '@mantine/core';
import { UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from 'react-hook-form';

import {
  ASSISTANTS_FIELDS,
  CHANNEL_FIELDS,
  JIVOSITE_FIELDS
} from '@web/pages/Assistants/components/AssistantsForm';
import classes from '@web/pages/Assistants/components/AssistantsForm/Channel/Telegram/Telegram.module.css';
import TemplateField from '@web/pages/Assistants/components/AssistantsForm/Fields/ChannelField';
import InputField from '@web/components/Forms/InputField';
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

function Jivosite({
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
      `${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.PROVIDER_ID}`,
      settings.provider_id
    );
    setValue(
      `${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.CHANNEL_ID}`,
      settings.channel_id
    );
    setValue(
      `${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.PROVIDER_TOKEN}`,
      settings.provider_token
    );
  }, [settings, setValue]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    setValue(`${name}.${CHANNEL_FIELDS.ID}`, id);
  }, [id, setValue]);

  const handleDelete = () => {
    if (id) {
      if (fieldsLength <= 1) {
        return;
      }
      const updatedItem = {
        ...data,
        _destroy: true
      };
      update(index, updatedItem);
    } else {
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.PROVIDER_ID}`, '');
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.CHANNEL_ID}`, '');
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.PROVIDER_TOKEN}`, '');
      remove(index);
    }
  };
  return (
    <Flex direction="column" gap="md">
      <Flex className={cx(classes.root, className)} gap="md">
        <TemplateField
          label="Канал интеграции"
          placeholder="Выберите канал для интеграции"
          name={name}
          templates={templates}
          removeChannel={handleDelete}
        />

        <InputField
          className={classes.input}
          name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.PROVIDER_ID}`}
          label="ID провайдера"
          placeholder="Пример: 1112223334"
        />
        <InputField
          className={classes.input}
          name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.CHANNEL_ID}`}
          label="ID канала"
          placeholder="Пример: 1112223334"
        />
      </Flex>
      <InputField
        className={classes.input}
        name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${JIVOSITE_FIELDS.PROVIDER_TOKEN}`}
        label="Token провайдера"
        placeholder="Пример: a1a111a1-1a11-1aaa-11a1-1a11a11a1aa1"
      />
    </Flex>
  );
}

export default Jivosite;
