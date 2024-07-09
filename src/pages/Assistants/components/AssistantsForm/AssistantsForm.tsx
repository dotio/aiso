import * as React from 'react';

import classes from './AssistantsForm.module.css';
import { Stack } from '@mantine/core';

import Name from './Name';
import Source from './Source';
import Graph from './Graph';
import Channel from './Channel';
import { IAssistant } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant?: IAssistant;
}>;

function AssistantsForm({ className, assistant }: Props) {
  return (
    <Stack className={classes.root} gap="xl">
      <Name assistant={assistant} />
      <Channel assistant={assistant} />
      <Source assistant={assistant} />
      <Graph assistant={assistant} />
    </Stack>
  );
}

export default AssistantsForm;
