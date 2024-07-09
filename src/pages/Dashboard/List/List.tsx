import * as React from 'react';
import { Box } from '@mantine/core';
import { useState } from 'react';
import { Tabs } from '@mantine/core';

import classes from './List.module.css';
import Content from './Content';
import Header from '@web/pages/Dashboard/List/Header';
import { useAppDispatch } from '@web/store';
import { dashboardFetchAllAction } from '@web/store/dashboardSlice/actions';
import dayjs from '@web/utils/dayjs';
import { DashboardPeriods } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

const List: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>('day');
  const today = dayjs();
  const yesterday = today.subtract(1, 'day');
  const oneWeekAgo = today.subtract(1, 'week');
  const oneMonthAgo = today.subtract(1, 'month');
  const startOf1970 = dayjs('2024-01-01');
  const [selectedDates, setSelectedDates] = useState<[Date | null, Date | null]>([
    yesterday.toDate(),
    yesterday.toDate()
  ]);

  const handleApplyDate = (dateFrom: dayjs.Dayjs, dateTo: dayjs.Dayjs) => {
    dispatch(
      dashboardFetchAllAction({
        from_date: dateFrom.format('YYYY-MM-DD'),
        to_date: dateTo.format('YYYY-MM-DD')
      })
    );
    setSelectedDates([dateFrom.toDate(), dateTo.toDate()]);
  };

  const getTabData = async (tab: string) => {
    switch (tab) {
      case DashboardPeriods.DAY:
        return handleApplyDate(yesterday, yesterday);

      case DashboardPeriods.WEEK:
        return handleApplyDate(oneWeekAgo, today);

      case DashboardPeriods.MONTH:
        return handleApplyDate(oneMonthAgo, today);

      case DashboardPeriods.ALL:
        return handleApplyDate(startOf1970, today);

      default:
        handleApplyDate(yesterday, yesterday);
    }
  };

  const handleTabChange = async (value: string | null) => {
    if (value !== null) {
      setActiveTab(value);
      try {
        await getTabData(value);
      } catch (error) {
        console.error('Error fetching tab data:', error);
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Header
          activeTab={activeTab}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
        <Content />
      </Tabs>
    </Box>
  );
};

export default List;
