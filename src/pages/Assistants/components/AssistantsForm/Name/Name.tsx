import * as React from 'react';
import { Flex, Text } from '@mantine/core';
import { useFormContext } from 'react-hook-form';

import classes from './Name.module.css';
import { ASSISTANTS_FIELDS } from '../AssistantsForm.schema';
import { NameField } from '../Fields';
import SelectField from '@web/components/Forms/SelectField';
import { AssistantsSections, CommunicationList, GenderList, IAssistant } from '@web/types';
import AvatarForm from '@web/pages/Assistants/components/AssistantsForm/AvatarForm';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant?: IAssistant | undefined | null;
}>;

function Name({ className, assistant }: Props) {
  const { setValue } = useFormContext();

  React.useEffect(() => {
    if (!assistant) {
      return;
    }

    setValue(`${ASSISTANTS_FIELDS.AVATAR}`, assistant.avatar);
    setValue(`${ASSISTANTS_FIELDS.NAME}`, assistant.name);
    setValue(`${ASSISTANTS_FIELDS.GENDER}`, assistant.gender);
    setValue(`${ASSISTANTS_FIELDS.COMMUNICATION_STYLE}`, assistant.communication_style);
  }, [assistant, setValue]);

  return (
    <Flex direction="column" gap="md">
      <Text fw={500} size="xl" id={AssistantsSections.Main}>
        Основные настройки
      </Text>
      <AvatarForm name={ASSISTANTS_FIELDS.AVATAR} />
      <Flex gap="md">
        <NameField
          className={classes.root}
          name={ASSISTANTS_FIELDS.NAME}
          label="Имя ассистента"
          placeholder="Пример: aiso Catherine"
        />
        <SelectField
          className={classes.input}
          name={ASSISTANTS_FIELDS.GENDER}
          label="Пол"
          placeholder="Выберите пол"
          options={GenderList as []}
        />
      </Flex>
      <Flex>
        <SelectField
          className={classes.input}
          name={ASSISTANTS_FIELDS.COMMUNICATION_STYLE}
          label="Стиль общения"
          placeholder="Выберите стиль общения"
          options={CommunicationList as []}
        />
      </Flex>
    </Flex>
  );
}

export default Name;
