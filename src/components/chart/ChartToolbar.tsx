import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { RiderData } from './ChartView';

interface ChartToolbarProps {
    chartType: 'bar' | 'pie';
    selectedRider: RiderData;
    riders: RiderData[];
    onChartTypeChange: () => void;
    onRiderChange: (event: SelectChangeEvent) => void;
}

function ChartToolbar({
  chartType,
  selectedRider,
  riders,
  onChartTypeChange,
  onRiderChange,
}: ChartToolbarProps): React.ReactElement {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar variant="dense" sx={{ minHeight: '48px' }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Orders Analysis
          {' '}
          {chartType === 'bar' ? 'Bar Chart' : 'Pie Chart'}
        </Typography>
        <Select
          value={selectedRider.riderId}
          onChange={onRiderChange}
          size="small"
          sx={{ width: 200, mr: 2 }}
        >
          {riders.map((rider) => (
            <MenuItem key={rider.riderId} value={rider.riderId}>
              {rider.name}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={onChartTypeChange} size="small">
          {chartType === 'bar' ? <PieChartIcon /> : <BarChartIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ChartToolbar;
