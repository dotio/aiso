import * as React from 'react';
import cx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { Box, Text } from '@mantine/core';

import SelectField from '../Fields/SelectField';
import { ASSISTANTS_FIELDS } from '../AssistantsForm.schema';
import classes from './Source.module.css';
import { useAppSelector } from '@web/store';
import { sourcesSelectOptionsSelector } from '@web/store/sourcesSlice/selectors';
import { AssistantsSections, IAssistant } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant?: IAssistant | undefined | null;
}>;

function Channel({ className, assistant }: Props) {
  const [loading, data] = useAppSelector(sourcesSelectOptionsSelector);
  const { setValue } = useFormContext();

  React.useEffect(() => {
    if (!assistant) {
      return;
    }

    setValue(`${ASSISTANTS_FIELDS.SOURCE}`, assistant.source);
  }, [assistant, setValue]);
  return (
    <Box className={cx(classes.root, className)}>
      <Text fw={500} size="xl" id={AssistantsSections.Sources}>
        Источник данных
      </Text>
      <SelectField
        name={ASSISTANTS_FIELDS.SOURCE}
        placeholder="Выберите один из доступных источников"
        loading={loading}
        data={data}
      />
    </Box>
  );
}

export default Channel;
