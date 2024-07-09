import * as React from 'react';
import { Flex, Box } from '@mantine/core';

import classes from './Footer.module.css';
import DashboardTable from '@web/pages/Dashboard/List/Content/Footer/components/Table';
import Chart from 'apps/ai-client-web/src/pages/Dashboard/List/Content/Footer/components/Chart';
import { IDashboardItemList, IDashboardMeta } from '@web/types';
import { Dispatch, SetStateAction } from 'react';
import { IActiveLines } from '@web/pages/Dashboard/List/Content/Content';

type IFooterProps = {
  data: IDashboardItemList[];
  meta: IDashboardMeta;
  activeLines: IActiveLines;
  setActiveLines: Dispatch<SetStateAction<IActiveLines>>;
};

function Footer({ data, meta, activeLines, setActiveLines }: IFooterProps) {
  return (
    <Box mt="56px" className={classes.root}>
      <Flex justify="space-between" gap="36px">
        <Flex w="50%" h="480">
          <Chart data={data} meta={meta} activeLines={activeLines} setActiveLines={setActiveLines}/>
        </Flex>
        <Flex className={classes.table} w="50%">
          <DashboardTable data={data} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
