import * as React from 'react';
import { Box, ActionIcon } from '@mantine/core';
import { IconLogout2 } from '@tabler/icons-react';

import { IProfile } from '@web/types';
import classes from './Profile.module.css';


type Props = React.PropsWithChildren<{
  className?: string | undefined;
  currentUser: IProfile;
  onSignout: () => void;
}>;

function Profile({ currentUser, onSignout, className }: Props) {
  return (
    <Box className={classes.root}>
      <ActionIcon className={classes.link} variant="outline" onClick={onSignout}>
        <IconLogout2 size={24} />
      </ActionIcon>
    </Box>
  );
}

export default Profile;
