import * as React from 'react';
import cx from 'clsx';
import { Box } from '@mantine/core';

import classes from './Header.module.css';


type Props = React.PropsWithChildren<{
  className?: string | undefined;
  left?: React.ReactNode;
  right?: React.ReactNode;
}>

function Header({ className, left, right, children }: Props) {
  return (
    <Box className={cx(className,classes.root)}>
      {left && (
        <Box className={classes.left}>
          {left}
        </Box>
      )}

      <Box className={classes.main}>
        {children}
      </Box>

      {right && (
        <Box className={classes.right}>
          {right}
        </Box>
      )}
    </Box>
  );
}

export default Header;
