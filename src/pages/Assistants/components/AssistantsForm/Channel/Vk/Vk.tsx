import * as React from 'react';
import cx from 'clsx';
import { Flex } from '@mantine/core';
import { UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from 'react-hook-form';

import {
  ASSISTANTS_FIELDS,
  CHANNEL_FIELDS,
  VK_FIELDS
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

function Vk({ className, templates, index, name, remove, update, fieldsLength, ...rest }: Props) {
  const { setValue, watch } = useFormContext();
  const { settings, id } = rest as any;
  const data = watch(name);

  React.useEffect(() => {
    if (!settings) {
      return;
    }

    setValue(
      `${name}.${ASSISTANTS_FIELDS.SETTINGS}.${VK_FIELDS.ACCESS_TOKEN}`,
      settings.access_token
    );
    setValue(
      `${name}.${ASSISTANTS_FIELDS.SETTINGS}.${VK_FIELDS.GROUP_ID}`,
      settings.group_id
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
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${VK_FIELDS.ACCESS_TOKEN}`, '');
      setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${VK_FIELDS.GROUP_ID}`, '');
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
          name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${VK_FIELDS.ACCESS_TOKEN}`}
          label="Токен провайдера"
          placeholder="Пример: 1112223334"
        />
        <InputField
          className={classes.input}
          name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${VK_FIELDS.GROUP_ID}`}
          label="ID группы"
          placeholder="Пример: 1112223334"
        />
      </Flex>
    </Flex>
  );
}

export default Vk;
