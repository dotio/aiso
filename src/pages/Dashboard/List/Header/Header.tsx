import * as React from 'react';
import { Text, Flex } from '@mantine/core';

import Calendar from '@web/pages/Dashboard/components/Calendar';
import CustomTabs from '@web/pages/Dashboard/components/CutomTabs/CustomTabs';
import { DashboardPeriods } from '@web/types';
import { useAppSelector } from '@web/store';
import { dashboardAllSelector } from '@web/store/dashboardSlice/selectors';
import { isEmpty } from 'lodash';

type HeaderProps = {
  activeTab: string;
  setSelectedDates: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
  selectedDates: [Date | null, Date | null];
}

function Header({ activeTab, selectedDates, setSelectedDates }:HeaderProps) {
  const [_,data] = useAppSelector(dashboardAllSelector);
  const noData = isEmpty(data);

  const tabs = [
    { label: 'День', value: DashboardPeriods.DAY },
    { label: 'Неделя', value: DashboardPeriods.WEEK },
    { label: 'Месяц', value: DashboardPeriods.MONTH },
    { label: 'Все время', value: DashboardPeriods.ALL }
  ];

  return (
    <Flex justify="space-between" align="center" pr="36px">
      <Text fz={36} fw={600}>Статистика</Text>
      <Flex gap="md" align="baseline">
        <CustomTabs noData={noData} tabs={tabs} activeTab={activeTab} selectedDates={selectedDates} />
        <Calendar noData={noData} placeholder="Выбрать период" defaultValue={selectedDates} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
      </Flex>
    </Flex>
  );
}

export default Header;
