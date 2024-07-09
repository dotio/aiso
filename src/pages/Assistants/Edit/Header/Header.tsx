import * as React from 'react';
import { Text, Box } from '@mantine/core';

import classes from './Header.module.css';
import { IAssistant } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
}>;

function Header({ className, assistant }: Props) {
  return (
    <Box className={classes.root}>
      <Text fw={600} size="36px" className={classes.root}>
        Настройки ассистента
      </Text>
    </Box>
  );
}

export default Header;
