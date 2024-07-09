import * as React from 'react';
import cx from 'clsx';
import { ChannelTags, IAssistant } from '@web/types';

import classes from './Control.module.css';
import { Button, Group } from '@mantine/core';
import { IconPlayerPlayFilled, IconPlayerStopFilled } from '@tabler/icons-react';
import { useAppDispatch } from '@web/store';

import { assistantsStartChannelAction } from '@web/store/assistantsSlice/actions/assistanstStartChannelAction';
import { assistantsStopChannelAction } from '@web/store/assistantsSlice/actions/assistanstStopChannelAction';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
  tag: ChannelTags;
  status: string;
}>;

function Control({ assistant, className, tag, status }: Props) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleAssistantsStart = async (currentTag: ChannelTags) => {
    setIsLoading(true);
    await dispatch(assistantsStartChannelAction({ assistant_id: assistant.id, tag: currentTag }));
    setIsLoading(false);
  };

  const handleAssistantsStop = async (currentTag: ChannelTags) => {
    setIsLoading(true);
    await dispatch(assistantsStopChannelAction({ assistant_id: assistant.id, tag: currentTag }));
    setIsLoading(false);
  };

  return (
    <Group className={cx(classes.root, className)}>
      {status !== 'started' ? (
        <Button
          className={classes.btn}
          loading={isLoading}
          variant="light"
          onClick={() => handleAssistantsStart(tag)}
        >
          <IconPlayerPlayFilled size={24} />
        </Button>
      ) : (
        <Button
          loading={isLoading}
          variant="light"
          color="red"
          onClick={() => handleAssistantsStop(tag)}
        >
          <IconPlayerStopFilled size={24} />
        </Button>
      )}
    </Group>
  );
}

export default Control;
