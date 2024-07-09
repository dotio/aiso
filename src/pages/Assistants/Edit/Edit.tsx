import * as React from 'react';
import { Loader } from '@mantine/core';

import { useAppSelector } from '@web/store';
import useTypedParams from '@web/hooks/useTypedParams';
import { assistantsSelectById } from '@web/store/assistantsSlice/selectors';

import Body from './Body';
import classes from './Edit.module.css';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

const Edit: React.FC<Props> = () => {
  const { assistantId } = useTypedParams(['assistantId']);

  const assistant = useAppSelector((state) => assistantsSelectById(state, assistantId));

  if (!assistant) {
    return <Loader className={classes.loader} color="blue" type="bars" />;
  }

  return <Body assistant={assistant} />;
};

export default Edit;
