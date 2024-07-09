import * as React from 'react';
import cx from 'clsx';
import { UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from 'react-hook-form';
import { Alert, Flex } from '@mantine/core';

import classes from './Telegram.module.css';
import {
  ASSISTANTS_FIELDS,
  CHANNEL_FIELDS,
  TELEGRAM_FIELDS
} from '@web/pages/Assistants/components/AssistantsForm';
import InputField from '@web/components/Forms/InputField';
import TemplateField from '@web/pages/Assistants/components/AssistantsForm/Fields/ChannelField';
import { IAssistantChannelTemplate } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  templates: IAssistantChannelTemplate[];
  index: number;
  fieldsLength: number;
  name: string;
  update: UseFieldArrayUpdate<any, any>;
  remove: UseFieldArrayRemove;
}>;

function Telegram({
  className,
  templates,
  index,
  name,
  remove,
  update,
  fieldsLength,
  ...rest
}: Props) {
  const { resetField, setValue, watch } = useFormContext();
  const { settings, id } = rest as any;
  const data = watch(name);

  React.useEffect(() => {
    if (!settings) {
      return;
    }
    setValue(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${TELEGRAM_FIELDS.TOKEN}`, settings.token);
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
      resetField(`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${TELEGRAM_FIELDS.TOKEN}`);
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
          name={`${name}.${ASSISTANTS_FIELDS.SETTINGS}.${TELEGRAM_FIELDS.TOKEN}`}
          label="Токен авторизации"
          placeholder="Пример: 1112223334:AAAAaaaaaaBBBBbbbbbbCCCCccccccDDDDd"
        />
      </Flex>
      <Alert title="Как получить токен?">
        Для этого есть... Бот. Просто напишите пользователю{' '}
        <a href="https://t.me/botfather" rel="noreferrer" target="_blank">
          @BotFather
        </a>{' '}
        и следуйте его инструкциям. После создания бота Вы получите свой токен авторизации.
      </Alert>
    </Flex>
  );
}

export default Telegram;
