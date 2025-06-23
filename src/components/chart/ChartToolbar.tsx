import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton, Box,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { RiderData } from './ChartView';

interface ChartToolbarProps {
    chartType: 'bar' | 'pie' | 'line';
    selectedRider: RiderData;
    riders: RiderData[];
    onChartTypeChange: (type: 'bar' | 'pie' | 'line') => void;
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
          {chartType === 'bar' ? 'Bar Chart' : chartType === 'pie' ? 'Pie Chart' : 'Line Chart'}
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
        <Box>
          <IconButton
            onClick={() => onChartTypeChange('bar')}
            size="small"
            color={chartType === 'bar' ? 'primary' : 'default'}
          >
            <BarChartIcon />
          </IconButton>
          <IconButton
            onClick={() => onChartTypeChange('pie')}
            size="small"
            color={chartType === 'pie' ? 'primary' : 'default'}
          >
            <PieChartIcon />
          </IconButton>
          <IconButton
            onClick={() => onChartTypeChange('line')}
            size="small"
            color={chartType === 'line' ? 'primary' : 'default'}
          >
            <ShowChartIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ChartToolbar;
