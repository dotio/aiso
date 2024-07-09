import * as React from 'react';
import cx from 'clsx';
import { Box, BoxComponentProps, Image } from '@mantine/core';

import classes from './Logo.module.css';


interface Props extends BoxComponentProps {
  size?: number;
}

function Logo({ size = 40, className, ...rest }: Props) {
  return (
    <Box
      className={cx(classes.root, className)}
      {...rest}
    >
      <Image
        w={size}
        h={size}
        src={'/logo.svg'}
      />
    </Box>
  );
}

export default Logo;
