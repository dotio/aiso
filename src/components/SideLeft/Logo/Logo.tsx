import * as React from 'react';

import classes from './Logo.module.css';
import { Box, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

type Props = React.PropsWithChildren<{
  className?: string | undefined
}>

function Logo({ className }: Props) {
  return (
    <Box
      component={Link}
      to='/'
      className={classes.root}
    >
      <Image
        width={36}
        height={36}
        src={'/logo200.png'}
      />
    </Box>
  );
}

export default Logo;
