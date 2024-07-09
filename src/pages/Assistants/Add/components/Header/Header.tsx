import * as React from 'react';
import { Text, Box } from '@mantine/core';

import classes from './Header.module.css';
import BreadCrumbs from '@web/components/BreadCrumbs';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

function Header({ className }: Props) {
  return (
    <Box className={classes.root}>
      <BreadCrumbs
        backHref="/assistants/"
        currentNameLink="Новый ассистент"
        backNameLink="Все ассистенты"
      />
      <Text fw={600} size="36px" className={classes.root}>
        Новый ассистент
      </Text>
    </Box>
  );
}

export default Header;
