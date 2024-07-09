import * as React from 'react';

import classes from './LayoutBody.module.css';
import { Box, Container } from '@mantine/core';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  header?: React.ReactNode;
  fluid?: boolean;
}>

function LayoutBody({ className, header, fluid, children }: Props) {
  return (
    <Container
      className={classes.root}
      size='xl'
      fluid={fluid}
    >
      {header && (
        <Box className={classes.header}>
          {header}
        </Box>
      )}

      <Box className={classes.body}>
        {children}
      </Box>
    </Container>
  );
}

export default LayoutBody;
