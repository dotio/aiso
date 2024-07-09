import React from 'react';
import { Box, Text } from '@mantine/core';
import { IconLoader } from '@tabler/icons-react';

import classes from './MainLoader.module.css';

interface LoaderProps {
  size?: number;
  title?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 50, title }) => {
  return (
    <Box className={classes.loaderContainer}>
      <IconLoader size={size} color="#E9485A" stroke={1} className={classes.loaderSvg} />
      {title && (
        <Text color="#0C181E" size="sm" mt="md">
          {title}
        </Text>
      )}
    </Box>
  );
};

export default Loader;
