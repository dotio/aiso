import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Text } from '@mantine/core';
import dayjs from 'dayjs';

import CustomLegend from './CustomLegend';
import classes from './Chart.module.css';
import { IDashboardItemList, IDashboardMeta } from '@web/types';
import { IActiveLines } from '@web/pages/Dashboard/List/Content/Content';

type Props = {
  data: IDashboardItemList[];
  meta: IDashboardMeta;
  activeLines: IActiveLines;
  setActiveLines: Dispatch<SetStateAction<IActiveLines>>;
};

const Chart = ({ data, meta, activeLines, setActiveLines }: Props) => {
  const format = meta?.detalization_level === 'day' ? 'DD/MM' : 'HH:mm';

  return (
    <Box className={classes.root}>
      <Text size="28px" fw={600} mb="lg">
        Отчет по диалогам
      </Text>

      <ResponsiveContainer className={classes.chart}>
        <LineChart data={data}>
          <CartesianGrid
            className={classes.lines}
            vertical={false}
            strokeWidth={3}
            stroke="#f6f7fa"
          />
          <XAxis
            tick={{ fill: '#b0bec5' }}
            stroke="#f6f7fa"
            tickLine={false}
            strokeWidth={3}
            dataKey="date"
            tickFormatter={(time) => dayjs(time).format(format)}
          />
          <YAxis tick={{ fill: '#b0bec5' }} axisLine={false} tickLine={false} />
          {/*<Tooltip formatter={(val, name) => [val, dictionary[String(name)?.split('.')[0]]]} />*/}
          <Legend
            content={<CustomLegend {...{ activeLines, setActiveLines }} />}
          />

          <Line
            strokeWidth={3}
            hide={activeLines.target_actions}
            dataKey="target_actions.count"
            stroke="#D7E0E3"
          />
          <Line
            strokeWidth={3}
            hide={activeLines.service_topics}
            dataKey="service_topics.total_count"
            stroke="#5D98EF"
          />
          <Line
            strokeWidth={3}
            hide={activeLines.target_topics}
            dataKey="target_topics.total_count"
            stroke="#7AED92"
          />
          <Line
            strokeWidth={3}
            hide={activeLines.non_target_topics}
            dataKey="non_target_topics.total_count"
            stroke="#E9485A"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Chart;
