import * as React from 'react';
import { Box } from '@mantine/core';
import { isEmpty } from 'lodash';

import CustomSkeleton from '@web/components/CustomSkeleton';

import Item from './Item';
import classes from './Items.module.css';
import { IAssistant } from '@web/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistants: IAssistant[];
}>;

const Items: React.FC<Props> = ({assistants}) => {


  if (isEmpty(assistants)) return <CustomSkeleton />;

  return (
    <Box className={classes.root}>
      {assistants.map((item) => (
        <Item key={item.id} assistant={item} />
      ))}
    </Box>
  );
};

export default Items;
