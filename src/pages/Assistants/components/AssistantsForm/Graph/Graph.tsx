import * as React from 'react';
import cx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { Box, Text } from '@mantine/core';

import classes from './Graph.module.css';
import SelectField from '../Fields/SelectField';
import { ASSISTANTS_FIELDS } from '../AssistantsForm.schema';

import { useAppSelector } from '@web/store';
import { graphsSelectOptionsSelector } from '@web/store/graphsSlice/selectors';
import { AssistantsSections, IAssistant } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant?: IAssistant | undefined | null;
}>;

function Graph({ className, assistant }: Props) {
  const [loading, data] = useAppSelector(graphsSelectOptionsSelector);
  const { setValue } = useFormContext();

  React.useEffect(() => {
    if (!assistant) {
      return;
    }

    setValue(`${ASSISTANTS_FIELDS.GRAPH}`, assistant.graph);
  }, [assistant, setValue]);
  return (
    <Box className={cx(classes.root, className)}>
      <Text fw={500} size="xl" id={AssistantsSections.Graph}>
        Сценарий
      </Text>
      <SelectField
        name={ASSISTANTS_FIELDS.GRAPH}
        placeholder="Выберите один из доступных графов"
        loading={loading}
        data={data}
      />
    </Box>
  );
}

export default Graph;
