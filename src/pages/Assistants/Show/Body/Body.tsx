import * as React from 'react';
import { IAssistant } from '@web/types';

import { Body } from '@web/components/Layout';

import classes from './Body.module.css';
import Header from '../Header';
import Content from './Content';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  assistant: IAssistant;
}>;

const BodyComponent: React.FC<Props> = ({ assistant }) => {
  return (
    <Body className={classes.root}>
      <Body.Header>
        <Header assistant={assistant} />
      </Body.Header>

      <Body.Content className={classes.content}>
        <Content assistant={assistant} />
      </Body.Content>
    </Body>
  );
};

export default BodyComponent;
