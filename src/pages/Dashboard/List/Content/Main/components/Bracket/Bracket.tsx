import * as React from 'react';
import { Box } from '@mantine/core';
import { ArcherElement } from 'react-archer';
import { AnchorPositionType } from 'react-archer/lib/types';

type Props = React.PropsWithChildren<{
  className?: string | undefined;
  id: string;
  to?: string;
  targetAnchor?: AnchorPositionType;
  sourceAnchor?: AnchorPositionType;
  children: React.ReactElement;
}>;

function Bracket({ children, id, to, targetAnchor, sourceAnchor }: Props) {
  return (
    <Box w="100%">
      <ArcherElement
        id={id}
        relations={
          to
            ? [
                {
                  targetId: to,
                  targetAnchor: targetAnchor as AnchorPositionType,
                  sourceAnchor: sourceAnchor as AnchorPositionType,
                  className: 'bracket'
                }
              ]
            : []
        }
      >
        {children}
      </ArcherElement>
    </Box>
  );
}

export default Bracket;
