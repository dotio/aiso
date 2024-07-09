import React, { Dispatch, SetStateAction } from 'react';
import { Box, Text } from '@mantine/core';
import { LegendProps } from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

import { dictionary } from '../utils/dictionary';
import { IActiveLines } from '@web/pages/Dashboard/List/Content/Content';

import classes from './CustomLegend.module.css';

interface Props extends LegendProps {
  activeLines: IActiveLines;
  setActiveLines: Dispatch<SetStateAction<IActiveLines>>;
}

const CustomLegend = (props: Props) => {
  const { payload, setActiveLines, activeLines} = props;

  const handleClick = (item: Payload) => {
    const key = String(item?.dataKey)?.split('.')?.[0] as keyof IActiveLines;
    setActiveLines((prev: IActiveLines) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <Box className={classes.legend}>
      {payload &&
        payload.map((item: Payload) => {
          const key: keyof IActiveLines = item?.value?.split('.')[0] || '';

          return (
            <Box
              opacity={activeLines[key] ? 0.5 : 1}
              onClick={() => handleClick(item)}
              className={classes.legend_item}
              key={item?.value}
            >
              <Box className={classes.legend_color_box} bg={item?.color} />
              <Text size="14px" fw={400}>
                {dictionary[key]}
              </Text>
            </Box>
          );
        })}
    </Box>
  );
};

export default CustomLegend;
