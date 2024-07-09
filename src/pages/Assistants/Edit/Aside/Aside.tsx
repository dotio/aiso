import * as React from 'react';
import cx from 'clsx';
import { Avatar, Box, Flex, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

import { AssistantsSections, IAssistant } from '@web/types';
import classes from './Aside.module.css';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant?: IAssistant | undefined | null;
}>;

function Aside({ assistant, className }: Props) {
  const count = assistant?.channels?.length;
  const menuItems = [
    { label: 'Основное', id: AssistantsSections.Main },
    { label: `Каналы интеграции (${count})`, id: AssistantsSections.Channels },
    { label: 'Источники данных', id: AssistantsSections.Sources },
    { label: 'Сценарий', id: AssistantsSections.Graph }
  ];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const handleClick = (item: any) => {
    setActiveItem(item);
    const element = document.getElementById(item.id) as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Flex justify="center" mt={24} align="center" direction="column" gap="xs">
        <Avatar src={assistant && assistant.avatar} size={124} alt="Avatar" />
        <Text size="md" fw={500} color="blue">
          {assistant && assistant.name}
        </Text>
      </Flex>
      <Flex direction="column" justify="center" gap="xs">
        {menuItems.map((item) => {
          const isActive = item.id === activeItem.id;
          return (
            <Box
              key={item.id}
              className={cx(classes.root, { [classes.active]: isActive })}
              onClick={() => handleClick(item)}
            >
              <Text className={classes.name}>{item.label}</Text>
              <Box className={classes.type}>
                <IconChevronRight />
              </Box>
              {isActive && (<Box className={classes.line}/>)}
            </Box>
          )
        })}
      </Flex>
    </>
  );
}

export default Aside;
