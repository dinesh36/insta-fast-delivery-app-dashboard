import React from 'react';
import { Box } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface ResizeHandleProps {
    direction: 'horizontal' | 'vertical';
    onMouseDown: (e: React.MouseEvent) => void;
}

function ResizeHandle({ direction, onMouseDown }: ResizeHandleProps): React.ReactElement {
  return (
    <Box
      sx={{
        position: 'absolute',
        cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.05)',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.1)',
        },
        ...(direction === 'horizontal' ? {
          right: 0,
          top: 0,
          width: '12px',
          height: '100%',
        } : {
          bottom: 0,
          left: 0,
          height: '12px',
          width: '100%',
        }),
      }}
      onMouseDown={onMouseDown}
    >
      {direction === 'horizontal' ? (
        <DragIndicatorIcon />
      ) : (
        <DragHandleIcon />
      )}
    </Box>
  );
}

export default ResizeHandle;
