import * as React from 'react';

import classes from './Layout.module.css';
import { Box } from '@mantine/core';
import clsx from 'clsx';

type Props = React.PropsWithChildren<{
  className?: string | undefined,
  sideLeft?: React.ReactNode
}>

function Layout({ sideLeft, children, className }: Props) {
  return (
    <Box className={classes.root}>
      {sideLeft && (
        <Box className={classes.sideLeft}>
          {sideLeft}
        </Box>
      )}

      <Box className={clsx(className, classes.body)}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
