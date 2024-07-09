import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Box } from '@mantine/core';

import classes from './SideLeft.module.css';

import Logo from '@web/components/Logo';
import Profile from './Profile';
import Navigation from './Navigation';

import { useAppDispatch } from '@web/store';
import { signOutRequestAction } from '@web/store/authSlice/actions';
import { IProfile } from '@web/types';
// import ThemeButton from '@web/components/ThemeButton';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  isAuthenticated?: boolean;
  currentUser: IProfile;
}>;

function SideLeft({ currentUser, className }: Props) {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOutRequestAction());
  };

  return (
    <Box className={classes.root}>
      <NavLink to="/" className={classes.top}>
        <Logo />
      </NavLink>

      <Box className={classes.body}>
        <Navigation />
      </Box>

      <Box className={classes.footer}>
        {/*<ThemeButton />*/}
        <Profile currentUser={currentUser} onSignout={handleSignOut} />
      </Box>
    </Box>
  );
}

export default SideLeft;
