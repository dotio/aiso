import * as React from 'react';
import { Text, Box } from '@mantine/core';

import classes from './Header.module.css';
import BreadCrumbs from '@web/components/BreadCrumbs';
import { IAssistant } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
}>;

function Header({ className, assistant }: Props) {
  return (
    <Box className={classes.root}>
      <BreadCrumbs
        backHref="/assistants/"
        currentNameLink={`ассистент ${assistant.name}`}
        backNameLink="Все ассистенты"
      />
      <Text fw={600} size="36px" className={classes.root}>
        Ассистент
      </Text>
    </Box>
  );
}

export default Header;
