import * as React from 'react';

import styles from './Bots.module.css';
import { ActionIcon, Stack } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>

function Bots({ className, children }: Props) {
  return (
    <Stack
      className={styles.root}
      gap={12}
      align='center'
    >
      <ActionIcon
        variant='default'
        size='xl'
        color='gray'
      >
        1
      </ActionIcon>

      <ActionIcon
        variant='default'
        size='xl'
        color='gray'
      >
        2
      </ActionIcon>

      <ActionIcon
        variant='default'
        size='xl'
        color='gray'
      >
        3
      </ActionIcon>

      <ActionIcon
        variant='default'
        size='xl'
        color='gray'
      >
        <IconPlus size={18} />
      </ActionIcon>
    </Stack>
  );
}

export default Bots;
