import * as React from 'react';
import { Box, Flex, Image, Text } from '@mantine/core';
import { IconTrendingUp } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

import classes from './StatElement.module.css';
import Bracket from '@web/pages/Dashboard/List/Content/Main/components/Bracket';
import { IDashboardMeta, IMessageDialogType } from '@web/types';
import { IActiveLines } from '@web/pages/Dashboard/List/Content/Content';


type Props = React.PropsWithChildren<{
  className?: string | undefined;
  icon: string;
  total_count: number;
  label: string;
  total_percent: number;
  increase_color: string;
  name: IMessageDialogType;
  hasSubData: boolean;
  failure_count?: number;
  success_count?: number;
  failure_percent: number;
  success_percent: number;
  meta: IDashboardMeta;
  setActiveLines: Dispatch<SetStateAction<IActiveLines>>;
}>;

function StatElement({
  icon,
  total_count,
  label,
  total_percent,
  success_percent,
  failure_percent,
  increase_color,
  name,
  hasSubData,
  failure_count,
  success_count,
  meta,
  setActiveLines
}: Props) {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const handleMessageOpen = (name: string, meta: IDashboardMeta) => {
    navigate(
      `/messages/?filter=${encodeURIComponent(name)}&from_date=${encodeURIComponent(meta.from_date)}&to_date=${encodeURIComponent(meta.to_date)}`
    );
  };

  const handleChartShow = (name: IMessageDialogType) => {
    switch (name) {
      case IMessageDialogType.TARGET_TOPICS:
        return setActiveLines((prev: IActiveLines) => ({
          ...prev,
          target_topics: !prev[IMessageDialogType.TARGET_TOPICS]
        }));
      case IMessageDialogType.SERVICE_TOPICS:
        return setActiveLines((prev: IActiveLines) => ({
          ...prev,
          service_topics: !prev[IMessageDialogType.SERVICE_TOPICS]
        }));
      case IMessageDialogType.NON_TARGET_TOPICS:
        return setActiveLines((prev: IActiveLines) => ({
          ...prev,
          non_target_topics: !prev[IMessageDialogType.NON_TARGET_TOPICS]
        }));
    }
  };

  return (
    <Box w="100%" className={classes.root}>
      <Bracket targetAnchor="top" sourceAnchor="top" id={name} to="root">
        <Flex direction="column">
          <Box
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className={classes.block}
          >
            <Flex gap="xs" align="center">
              <Image width={48} height={48} src={icon} />
              <Flex direction="column">
                <Text fw={500} size="xl">
                  {`${total_percent}%`}
                </Text>
                <Text size="sm">{label}</Text>
              </Flex>
            </Flex>
            <Flex gap={4}>
              <Text color={'var(--mantine-color-dimmed)'} size="sm">
                + {total_count}
              </Text>
              <IconTrendingUp color={increase_color} size={16} />
            </Flex>
            {show && (
              <Flex className={classes.btns}>
                <Image
                  onClick={() => handleMessageOpen(name, meta)}
                  width={36}
                  height={36}
                  src={'/icons/stat_table.svg'}
                />
                <Image
                  onClick={() => handleChartShow(name)}
                  width={36}
                  height={36}
                  src={'/icons/stat_chart.svg'}
                />
              </Flex>
            )}
          </Box>
        </Flex>
      </Bracket>
      {hasSubData && (
        <>
          <Flex className={classes.section}>
            <Bracket id="section">
              <Box></Box>
            </Bracket>
          </Flex>

          <Flex mx="sm" gap="md" mt="60px">
            {Array.from({ length: 2 }).map((_, index) => (
              <Bracket
                key={index}
                id={`${'section' + name + index}`}
                to={name}
                targetAnchor="bottom"
                sourceAnchor="top"
              >
                <Box key={index} className={classes.block_bottom}>
                  <Flex direction="column">
                    <Text
                      color={
                        index === 0 ? 'var(--mantine-color-green-4)' : 'var(--mantine-color-red-4)'
                      }
                      fw={500}
                      size="xl"
                    >
                      {`${index === 0 ? success_percent : failure_percent}%`}
                    </Text>
                    <Text size="sm" w="83px">
                      {index === 0 ? 'Успешных целевых' : 'Неуспешных целевых'}
                    </Text>
                  </Flex>

                  <Flex gap={4}>
                    <Text truncate color={'var(--mantine-color-dimmed)'} size="sm">
                      + {index === 0 ? success_count : failure_count}
                    </Text>
                    <IconTrendingUp
                      color={
                        index === 0 ? 'var(--mantine-color-green-4)' : 'var(--mantine-color-red-4)'
                      }
                      size={16}
                    />
                  </Flex>
                </Box>
              </Bracket>
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
}
export default StatElement;
