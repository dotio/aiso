import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { Flex } from '@mantine/core';
import { ArcherContainer } from 'react-archer';

import classes from './Main.module.css';
import StatElement from '@web/pages/Dashboard/List/Content/Main/components/StatElement';
import Bracket from '@web/pages/Dashboard/List/Content/Main/components/Bracket';
import { IDashboardItem, IDashboardMeta, IMessageDialogType } from '@web/types';
import { IActiveLines } from '@web/pages/Dashboard/List/Content/Content';

type Props = {
  data: IDashboardItem;
  meta: IDashboardMeta;
  setActiveLines: Dispatch<SetStateAction<IActiveLines>>;
};

const Main = ({ data, meta, setActiveLines } : Props) => {
  const getIsZero = (count: number) => {
    return count !== 0;
  };

  return (
    <Flex direction="column" gap="md" className={classes.root}>
      <ArcherContainer
        strokeWidth={1.5}
        strokeColor="var(--mantine-color-gray-3)"
        startMarker={true}
        endMarker={false}
      >
        <Bracket id="root">
          <Flex w="100%" gap="xl" pt="80px">
            <Fragment>
              <StatElement
                total_count={data?.target_topics?.total_count}
                icon="/icons/success_target.svg"
                label="Целевых всего"
                total_percent={data?.target_topics?.total_percent}
                increase_color="var(--mantine-color-green-4)"
                name={IMessageDialogType.TARGET_TOPICS}
                success_count={data?.target_topics?.success_count}
                failure_count={data?.target_topics?.failure_count}
                failure_percent={data?.target_topics?.failure_percent}
                success_percent={data?.target_topics?.success_percent}
                hasSubData={
                  getIsZero(data?.target_topics?.success_count) &&
                  getIsZero(data?.target_topics?.failure_count)
                }
                meta={meta}
                setActiveLines={setActiveLines}
              />
              <StatElement
                total_count={data?.service_topics?.total_count}
                icon="/icons/service_target.svg"
                label="Сервисных всего"
                total_percent={data?.service_topics?.total_percent}
                increase_color="var(--mantine-color-green-4)"
                name={IMessageDialogType.SERVICE_TOPICS}
                success_count={data?.service_topics?.success_count}
                failure_count={data?.service_topics?.failure_count}
                failure_percent={data?.service_topics?.failure_percent}
                success_percent={data?.service_topics?.success_percent}
                hasSubData={
                  getIsZero(data?.service_topics?.success_count) &&
                  getIsZero(data?.service_topics?.failure_count)
                }
                meta={meta}
                setActiveLines={setActiveLines}
              />
              <StatElement
                total_count={data?.non_target_topics?.total_count}
                icon="/icons/failure_target.svg"
                label="Нецелевых всего"
                total_percent={data?.non_target_topics?.total_percent}
                increase_color="var(--mantine-color-red-4)"
                name={IMessageDialogType.NON_TARGET_TOPICS}
                success_count={data?.non_target_topics?.success_count}
                failure_count={data?.non_target_topics?.failure_count}
                failure_percent={data?.non_target_topics?.failure_percent}
                success_percent={data?.non_target_topics?.success_percent}
                hasSubData={
                  getIsZero(data?.non_target_topics?.success_count) &&
                  getIsZero(data?.non_target_topics?.failure_count)
                }
                meta={meta}
                setActiveLines={setActiveLines}
              />
            </Fragment>
          </Flex>
        </Bracket>
      </ArcherContainer>
    </Flex>
  );
};
export default Main;
