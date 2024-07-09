import * as React from 'react';
import { Text, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { Header as HeaderComponent } from '@web/components/Layout';
import classes from './Header.module.css';
import { useNavigate } from 'react-router-dom';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

const Header: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/assistants/add');
  };
  return (
    <HeaderComponent
      className={classes.root}
      right={
        <Button
          radius="lg"
          size="xl"
          color="#E9485A"
          variant="filled"
          onClick={handleAdd}
          leftSection={<IconPlus size={24} />}
        >
          Создать робота
        </Button>
      }
      left={<Text fw={600} size="36px" className={classes.root}>
       Все ассистенты
      </Text>}
    >

    </HeaderComponent>
  );
};

export default Header;
