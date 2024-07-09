import * as React from 'react';
import cx from 'clsx';
import { Button, Group } from '@mantine/core';
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react';

import { IAssistant } from '@web/types';
import classes from './Control.module.css';
import { useAppDispatch } from '@web/store';
import {
  assistantsBotsStartAction,
  assistantsBotsStopAction
} from '@web/store/assistantsSlice/actions';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
}>;

function Control({ assistant, className }: Props) {
  // const { channels } = assistant;
  // const isSomeRunning = channels.some(({ status }) => status === 'started');
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAssistantsStart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await dispatch(assistantsBotsStartAction({ assistant_id: assistant.id }));
    setIsLoading(false);
  };

  const handleAssistantsStop = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await dispatch(assistantsBotsStopAction({ assistant_id: assistant.id }));
    setIsLoading(false);
  };
  return (
    <Group className={cx(classes.root, className)}>
      {assistant.status !== 'started' ? (
        <Button
          className={classes.btn}
          loading={isLoading}
          variant="light"
          onClick={(e) => handleAssistantsStart(e)}
        >
          <IconPlayerPlayFilled size={24} />
        </Button>
      ) : (
        <Button
          loading={isLoading}
          variant="light"
          color="red"
          onClick={(e) => handleAssistantsStop(e)}
        >
          <IconPlayerStopFilled size={24} />
        </Button>
      )}
    </Group>
  );
}

export default Control;
