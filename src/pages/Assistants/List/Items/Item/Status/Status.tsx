import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IAssistant } from '@web/types';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconAlertSmall, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  status: IAssistant['status'];
}>

function Status({ status, className, children }: Props) {
  const { t } = useTranslation();

  switch (status) {
    case 'idle':
      return (
        <Tooltip label={t('assistants.status.description', { context: status })}>
          <ActionIcon
            variant='light'
            color='gray'
          >
            <IconPlayerPauseFilled size={18} />
          </ActionIcon>
        </Tooltip>
      );

    case 'started':
      return (
        <Tooltip label={t('assistants.status.description', { context: status })}>
          <ActionIcon
            variant='light'
            color='green'
          >
            <IconPlayerPlayFilled size={18} />
          </ActionIcon>
        </Tooltip>
      );

    case 'rejected':
      return (
        <Tooltip label={t('assistants.status.description', { context: status })}>
          <ActionIcon
            variant='light'
            color='red'
          >
            <IconAlertSmall size={18} />
          </ActionIcon>
        </Tooltip>
      );

    default:
      return false;
  }
}

export default Status;
