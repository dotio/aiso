import React from 'react';
import classes from './Notification.module.css';
import { toast } from 'react-toastify';
import { Box, Image, Text } from '@mantine/core';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

export const notification = (
  type: NotificationType,
  title: string,
  description: string
): void => {
  toast[type](
    <Box className={classes.root}>
      <Text fz="14px" fw={500} color="#E9485A">
        {title}
      </Text>
      <Text fz="13px" fw={400} color="#323D42">
        {description}
      </Text>
    </Box>,
    {
      position: 'bottom-right',
      icon: <Image w={40} h={40} src={'./icons/stop.svg'} />,
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: false
    }
  );
};
