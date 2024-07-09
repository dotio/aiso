import * as React from 'react';
import { Avatar, Box, Divider, Flex, Text } from '@mantine/core';
import uniqolor from 'uniqolor';
import { NavLink } from 'react-router-dom';
import {
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconMessageChatbot,
  IconPencilMinus,
  IconBrandVk,
  IconAccessible
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { Channel, IAssistant } from '@web/types';
import abbreviation from '@web/utils/abbreviation';
import classes from './Content.module.css';
import dayjs from '@web/utils/dayjs/dayjs';
import Control from './Control';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
}>;

const getChannelIcon = (channel: Channel) => {
  switch (channel?.tag) {
    case 'telegram':
      return <IconBrandTelegram />;

    case 'whatsapp':
      return <IconBrandWhatsapp />;

    case 'vk':
      return <IconBrandVk />;

    case 'jira':
      return <IconAccessible />;

    default:
      return <IconMessageChatbot />;
  }
};

const Content: React.FC<Props> = ({ assistant }) => {
  const { id, name, channels, updated_at } = assistant;
  const { t } = useTranslation();

  return (
    <Box className={classes.root}>
      <Flex justify="space-between" align="center">
        <Flex gap="md" align="center">
          <Avatar size={120} radius="lg" color={uniqolor(name).color}>
            {abbreviation(name)}
          </Avatar>
          <Flex direction="column" gap="xs">
            <Text fz="xl" fw={500}>
              {name}
            </Text>
            <Text
              color="gray"
              size="sm"
            >{`Изменен ${dayjs(updated_at).format('DD MMM YYYY')}`}</Text>
          </Flex>
        </Flex>
        <NavLink to={`/assistants/${id}/edit`}>
          <IconPencilMinus size={24} color="#5D98EF" />
        </NavLink>
      </Flex>
      <Divider labelPosition="center" my="xl" />
      <Flex direction="column" gap="md">
        {channels.map((channel, index) => (
          <Flex className={classes.channel} align="center" justify="space-between" key={index}>
            <Flex align="center" gap="xs">
              {getChannelIcon(channel)}
              {t('assistants.channel.name', { context: channel.tag })}
            </Flex>
            <Control status={channel.status} assistant={assistant} tag={channel.tag} />
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Content;
