import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export type DateRange = '1W' | '1M' | '6M' | '1Y';

interface ChartRangeProps {
    range: DateRange;
    onRangeChange: (range: DateRange) => void;
}

function ChartRange({ range, onRangeChange }: ChartRangeProps): React.ReactElement {
    return (
        <ToggleButtonGroup
            value={range}
            exclusive
            onChange={(_, value) => value && onRangeChange(value)}
            size="small"
        >
            <ToggleButton value="1W">1W</ToggleButton>
            <ToggleButton value="1M">1M</ToggleButton>
            <ToggleButton value="6M">6M</ToggleButton>
            <ToggleButton value="1Y">1Y</ToggleButton>
        </ToggleButtonGroup>
    );
}

export default ChartRange;