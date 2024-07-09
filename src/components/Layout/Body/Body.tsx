import * as React from 'react';
import cx from 'clsx';

import classes from './Body.module.css';
import { Box } from '@mantine/core';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>

function Header({ className, children }: Props) {
  return (
    <Box className={cx(classes.header, className)}>
      {children}
    </Box>
  );
}

function Content({ className, children }: Props) {
  return (
    <Box className={cx(classes.content, className)}>
      {children}
    </Box>
  );
}

function Body({ className, children }: Props) {
  return (
    <Box className={cx(classes.root, className)}>
      {children}
    </Box>
  );
}

Body.Header = Header;

Body.Content = Content;

export default Body;
