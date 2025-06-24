import React from 'react';
import { Box, Typography } from '@mui/material';

interface LegendProps {
  data: { label: string; color: string }[];
}

function Legend({ data }: LegendProps): React.ReactElement {
  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
      {data.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 16, backgroundColor: item.color, borderRadius: '50%' }} />
          <Typography variant="body2">{item.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Legend;
