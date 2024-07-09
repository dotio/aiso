import * as React from 'react';
import cx from 'clsx';

import classes from './Unknown.module.css';
import { Box } from '@mantine/core';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>

function Unknown({ className }: Props) {
  return (
    <Box className={cx(classes.root, className)}>
      Unknown
    </Box>
  );
}

export default Unknown;
