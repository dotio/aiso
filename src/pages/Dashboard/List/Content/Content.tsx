import React, { useState } from 'react';
import { Box } from '@mantine/core';
import { isEmpty } from 'lodash';

import classes from './Content.module.css';
import Header from './Header';
import Main from '@web/pages/Dashboard/List/Content/Main';
import Footer from './Footer';
import { useAppSelector } from '@web/store';
import { dashboardAllSelector } from '@web/store/dashboardSlice/selectors';

import MainLoader from '@web/components/MainLoader';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

export interface IActiveLines {
  target_actions: boolean;
  service_topics: boolean;
  target_topics: boolean;
  non_target_topics: boolean;
}

const Content: React.FC<Props> = () => {
  const [loading, data, meta] = useAppSelector(dashboardAllSelector);
  const noData = isEmpty(data);
  const [activeLines, setActiveLines] = useState<IActiveLines>({
    target_actions: false,
    service_topics: false,
    target_topics: false,
    non_target_topics: false
  });

  return noData ? (
    <Box className={classes.empty}>
      <h1>Данные по статистике отсутствуют</h1>
    </Box>
  ) : (
    <Box className={classes.root}>
      {loading && !noData ? (
        <MainLoader title="Загрузка данных..." />
      ) : (
        <>
          <Header data={data.dashboard} />
          <Main data={data.dashboard} meta={meta} setActiveLines={setActiveLines} />
          <Footer
            data={data.items}
            meta={meta}
            activeLines={activeLines}
            setActiveLines={setActiveLines}
          />
        </>
      )}
    </Box>
  );
};

export default Content;
