import * as React from 'react';
import { Box, Skeleton } from '@mantine/core';

import classes from './CustomSkeleton.module.css';

const CustomSkeleton = (): JSX.Element => (
  <Box>
    <Box className={classes.skeleton}>
      <Skeleton height={40} mb="m" />
    </Box>
    <Box className={classes.skeleton}>
      <Skeleton height={40} mb="m" />
    </Box>
    <Box className={classes.skeleton}>
      <Skeleton height={40} mb="m" />
    </Box>
    <Box className={classes.skeleton}>
      <Skeleton height={40} mb="m" />
    </Box>
    <Box className={classes.skeleton}>
      <Skeleton height={40} mb="m" />
    </Box>
    <Box className={classes.skeleton}>
      <Skeleton height={40} mb="m" />
    </Box>
  </Box>
);

export default CustomSkeleton;
