import * as React from 'react';
import cx from 'clsx';

import classes from './Template.module.css';
import { Box } from '@mantine/core';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>

function Template({ className, children }: Props) {
  return (
    <Box className={cx(classes.root, className)}>
      {children}
    </Box>
  );
}

export default Template;
