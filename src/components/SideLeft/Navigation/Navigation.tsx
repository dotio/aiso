import * as React from 'react';
import cx from 'clsx';
import { Box } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import {
  IconFileAnalytics,
  IconDatabase,
  //IconSettings,
  IconChartDots3,
  IconRobotFace,
  IconMessage
} from '@tabler/icons-react';

import classes from './Navigation.module.css';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

// TODO add settings in future
function Navigation({ className }: Props) {
  const clsFunc = ({ isActive }: { isActive: boolean }) =>
    cx(classes.link, isActive && classes.active);

  return (
    <Box className={classes.root}>
      <NavLink to="/dashboard" className={clsFunc}>
        <IconFileAnalytics />
      </NavLink>

      <NavLink to="/assistants" className={clsFunc}>
        <IconRobotFace />
      </NavLink>

      {/*<NavLink to="/" className={clsFunc}>*/}
      {/*  <IconSettings />*/}
      {/*</NavLink>*/}

      <NavLink to="/sources" className={clsFunc}>
        <IconDatabase />
      </NavLink>

      <NavLink to="/graphs" className={clsFunc}>
        <IconChartDots3 />
      </NavLink>

      <NavLink to="/messages" className={clsFunc}>
        <IconMessage />
      </NavLink>
    </Box>
  );
}

export default Navigation;
