import * as React from 'react';
import cx from 'clsx';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Box, Text } from '@mantine/core';

import classes from './BreadCrrumbs.module.css';

type Props = {
  backNameLink?: string;
  currentNameLink?: string;
  backHref: string;
  className?: string;
}

function BreadCrumbs({ backNameLink, currentNameLink, backHref, className }: Props) {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(backHref);
  };

  return (
    <Box className={cx(className, classes.links)}>
      <Box className={classes.icon_link}>
        <Box className={classes.main_link} onClick={handleBack}>
          <IconArrowLeft width={24} height={24} />
          <Text fw={500} size="sm">
            {backNameLink}
          </Text>
        </Box>
        {currentNameLink && <Text fw={500} size="sm" color="gray">
          /
        </Text>}
        <Text fw={500} size="sm" color="gray">
          {currentNameLink}
        </Text>
      </Box>
    </Box>
  );
}

export default BreadCrumbs;
