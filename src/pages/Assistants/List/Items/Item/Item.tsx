import * as React from 'react';
import cx from 'clsx';
import uniqolor from 'uniqolor';
import { NavLink } from 'react-router-dom';
import { Avatar, Box, Flex, Text } from '@mantine/core';
import { IconPencilMinus } from '@tabler/icons-react';

import abbreviation from '@web/utils/abbreviation';
import { IAssistant } from '@web/types';
import classes from './Item.module.css';
import dayjs from '@web/utils/dayjs';
import Control from '@web/pages/Assistants/List/Items/Item/Control';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
}>;

const Item: React.FC<Props> = ({ assistant }) => {
  const { id, name, updated_at } = assistant;

  const clsFunc = ({ isActive }: { isActive: boolean }) =>
    cx(classes.root, isActive && classes.active);

  return (
    <NavLink className={clsFunc} to={`/assistants/${id}`}>
      <Flex justify="space-between" align="center">
        <Flex gap="md" align="center">
          <Box className={classes.avatar}>
            <Avatar size={60} radius="lg" color={uniqolor(name).color}>
              {abbreviation(name)}
            </Avatar>
          </Box>
          <Text fz="xl" fw={500}>
            {name}
          </Text>
        </Flex>
        <NavLink to={`/assistants/${id}/edit`}>
          <IconPencilMinus size={24} color="#5D98EF" />
        </NavLink>
      </Flex>
      <Flex justify="space-between" align="center" mt={6}>
        <Text color="gray" size="sm">{`Изменен ${dayjs(updated_at).format('DD MMM YYYY')}`}</Text>
        <Control assistant={assistant} />
      </Flex>
    </NavLink>
  );
};

export default Item;
