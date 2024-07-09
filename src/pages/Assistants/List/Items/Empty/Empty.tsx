import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text } from '@mantine/core';
import { IconDatabaseSearch, IconPlus } from '@tabler/icons-react';

import classes from './Empty.module.css';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

const Empty: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/assistants/add');
  };

  return (
    <Box className={classes.root}>
      <IconDatabaseSearch size={48} stroke={1} color={'var(--mantine-color-dimmed)'} />

      <Text ta="center">
        Выберите один из источников для просмотра или
        <br />
        добавьте новый
      </Text>

      <Button variant="light" onClick={handleAdd} leftSection={<IconPlus size={18} />}>
        Добавить
      </Button>
    </Box>
  );
};

export default Empty;
