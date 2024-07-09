import * as React from 'react';
import { Text, Flex, Box, Image } from '@mantine/core';
import { IconCheckbox, IconMessages, IconAlarm } from '@tabler/icons-react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import classes from './Header.module.css';
import { IDashboardItem } from '@web/types';

dayjs.extend(duration);

type Props = {
  data: IDashboardItem;
};

function TopHeader({ data }: Props) {

  function formatDuration(minutes:number) {
    const duration = dayjs.duration(minutes, 'minutes');
    const hours = duration.hours();
    const mins = duration.minutes();
    return `${hours}ч ${mins}м`;
  }

  return (
    <Box className={classes.root}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap="xs">
          <Image w={56} h={56} src={'./icons/chart.svg'} />
          <Flex direction="column">
            <Text fw={500} color="#5D98EF" size="44px">
              {`${data?.target_actions?.cost?.amount} ${data?.target_actions?.cost?.currency}`}
            </Text>
            <Text size="sm" color="var(--mantine-color-dimmed)">
              заработано за день
            </Text>
          </Flex>
        </Flex>
        <Flex gap="md">
          <Box className={classes.element} p="md" bg="var(--mantine-color-gray-1)">
            <Flex align="center" gap="xs">
              <IconCheckbox size={32} color="var(--mantine-color-gray-6)" />
              <Flex direction="column">
                <Text fw={500} size="28px">
                  {data?.target_actions?.count}
                </Text>
                <Text size="sm" color="var(--mantine-color-dimmed)">
                  броней
                </Text>
              </Flex>
            </Flex>
          </Box>

          <Box className={classes.element} p="md" bg="var(--mantine-color-gray-1)">
            <Flex align="center" gap="xs">
              <IconMessages size={32} color="var(--mantine-color-gray-6)" />
              <Flex direction="column">
                <Text fw={500} size="28px">
                  {data?.topics_count}
                </Text>
                <Text size="sm" color="var(--mantine-color-dimmed)">
                  диалогов
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Box className={classes.element} p="md" bg="var(--mantine-color-gray-1)">
            <Flex align="center" gap="xs">
              <IconAlarm size={32} color="var(--mantine-color-gray-6)" />
              <Flex direction="column">
                <Text fw={500} size="28px">
                  {formatDuration(data?.topics_duration)}
                </Text>
                <Text size="sm" color="var(--mantine-color-dimmed)">
                  сэкономлено времени сотрудников
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default TopHeader;
