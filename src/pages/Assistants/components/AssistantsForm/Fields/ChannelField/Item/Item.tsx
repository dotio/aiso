import * as React from 'react';

import { Box, Group, Stack, Text } from '@mantine/core';
import { IconBrandTelegram, IconBrandWhatsapp, IconMessageChatbot, IconBrandVk, IconAccessible } from '@tabler/icons-react';
import { ChannelTags, IAssistantChannelTemplate } from '@web/types';

const getIconComponent = (tag: IAssistantChannelTemplate['tag']) => {
  switch (tag) {
    case ChannelTags.TELEGRAM:
      return IconBrandTelegram;

    case ChannelTags.WHATSAPP:
      return IconBrandWhatsapp;

    case ChannelTags.VK:
      return IconBrandVk;

    case ChannelTags.JIRA:
      return IconAccessible;

    default:
      return IconMessageChatbot;
  }
};

function Item({ tag, name }: IAssistantChannelTemplate) {
  const IconComponent = getIconComponent(tag);

  return (
    <Group gap={8} wrap="nowrap">
      <Box>
        <IconComponent color={'var(--mantine-color-blue-7)'} size={20} />
      </Box>

      <Stack gap={0}>
        <Text fz="sm">{name}</Text>
      </Stack>
    </Group>
  );
}

export default Item;
