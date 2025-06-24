import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const chartTypes = [
  { value: 'bar', label: 'Bar Chart', Icon: BarChartIcon },
  { value: 'pie', label: 'Pie Chart', Icon: PieChartIcon },
  { value: 'line', label: 'Line Chart', Icon: ShowChartIcon },
  { value: 'comparison', label: 'Order Comparison', Icon: PieChartIcon },
  { value: 'status', label: 'Completed vs Cancelled', Icon: PieChartIcon },
];

interface ChartToolbarProps {
  chartType: 'bar' | 'pie' | 'line' | 'comparison' | 'status';
  onChartTypeChange: (type: 'bar' | 'pie' | 'line' | 'comparison' | 'status') => void;
}

function ChartToolbar({ chartType, onChartTypeChange }: ChartToolbarProps): React.ReactElement {
  const handleChartTypeChange = (event: SelectChangeEvent) => {
    onChartTypeChange(event.target.value as 'bar' | 'pie' | 'line');
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar variant="dense" sx={{ minHeight: '48px' }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Orders Analysis
        </Typography>
        <Select
            value={chartType}
            onChange={handleChartTypeChange}
            size="small"
            sx={{ width: 250 }}
        >
          {chartTypes.map(({ value, label, Icon }) => (
              <MenuItem key={value} value={value}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Icon /> {label}
                </Box>
              </MenuItem>
          ))}
        </Select>
      </Toolbar>
    </AppBar>
  );
}

export default ChartToolbar;