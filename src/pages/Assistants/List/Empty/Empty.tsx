import * as React from 'react';
import { Box, Text } from '@mantine/core';
import { IconRobotFace } from '@tabler/icons-react';

import classes from './Empty.module.css';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

const Empty: React.FC<Props> = () => {

  return (
    <Box className={classes.root}>
      <IconRobotFace size={48} stroke={1} color={'var(--mantine-color-dimmed)'} />

      <Text ta="center">
        Добавьте нового ассистента
      </Text>
    </Box>
  );
};

export default Empty;
