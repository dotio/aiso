import React, { useState } from 'react';
import { Switch, Loader } from '@mantine/core';
import { ChannelTags, IAssistant } from '@web/types';
import { assistantsStartChannelAction } from '@web/store/assistantsSlice/actions/assistanstStartChannelAction';
import { assistantsStopChannelAction } from '@web/store/assistantsSlice/actions/assistanstStopChannelAction';
import { useAppDispatch } from '@web/store';
import classes from './Switcher.module.css';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
  tag: ChannelTags;
}>;

function SwitcherChannel({ className, tag, assistant }: Props) {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setChecked(isChecked);
    setLoading(true);

    try {
      if (isChecked) {
        await dispatch(assistantsStartChannelAction({ assistant_id: assistant.id, tag }));
      } else {
        await dispatch(assistantsStopChannelAction({ assistant_id: assistant.id, tag }));
      }
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader size="xs" />
  ) : (
    <Switch
      className={classes.root}
      checked={checked}
      onChange={handleChange}
      color="blue"
      size="md"

    />
  );
}

export default SwitcherChannel;
