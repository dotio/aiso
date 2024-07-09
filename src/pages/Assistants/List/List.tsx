import * as React from 'react';
import { isEmpty } from 'lodash';
import cx from 'clsx';
import { Box } from '@mantine/core';

import { Body } from '@web/components/Layout';
import classes from './List.module.css';
import Header from './Header';
import Items from './Items';
import Empty from './Empty';
import { useAppSelector } from '@web/store';
import { assistantsSelectAllSelector } from '@web/store/assistantsSlice/selectors';


type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

const List: React.FC<Props> = () => {
  const [, assistants] = useAppSelector(assistantsSelectAllSelector);
  const noData = isEmpty(assistants)

  return (
    <Box>
      <Body.Header>
        <Header />
      </Body.Header>

      <Body.Content className={cx(noData ? classes.empty : classes.root)}>
        {noData ? <Empty /> : <Items  assistants={assistants}/>}
      </Body.Content>
    </Box>
  );
};

export default List;
