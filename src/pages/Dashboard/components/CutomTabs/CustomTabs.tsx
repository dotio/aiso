import * as React from 'react';
import { Tabs } from '@mantine/core';
import clsx from 'clsx';

import classes from './CustomTabs.module.css';

type ITabs = {
  value: string;
  label: string;
};

type CustomTabsProps = {
  activeTab: string;
  noData: boolean;
  tabs: ITabs[];
  selectedDates: [Date | null, Date | null];
};

function CustomTabs({ tabs, activeTab, noData }: CustomTabsProps) {
  return (
    <Tabs.List className={classes.container}>
      {tabs.map(({ label, value }, index) => {
        const isActive = activeTab === value;
        return (
          <Tabs.Tab
            key={index}
            className={clsx(classes.tabs, isActive && classes.tabs_active)}
            value={value}
            disabled={noData}
          >
            {label}
          </Tabs.Tab>
        );
      })}
    </Tabs.List>
  );
}

export default CustomTabs;
