import React, { forwardRef, useState } from 'react';
import './css/DateRangeFilter.css';

interface DateRangeFilterProps {
    colDef: {
        field: string;
    };
}

export const DateRangeFilter = forwardRef<unknown, DateRangeFilterProps>(() => {
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    const containerStyles: React.CSSProperties = {
        padding: '24px',
        width: '320px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)'
    };

    const inputContainerStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    };

    const fieldGroupStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    };

    const labelStyles: React.CSSProperties = {
        fontSize: '13px',
        color: 'rgba(0, 0, 0, 0.6)',
        fontWeight: 500,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    };

    return (
        <div className="ag-custom-component-popup" style={containerStyles}>
            <div style={inputContainerStyles}>
                <div style={fieldGroupStyles}>
                    <label htmlFor="fromDate" style={labelStyles}>From Date</label>
                    <input
                        className="custom-date-input"
                        type="date"
                        id="fromDate"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div style={fieldGroupStyles}>
                    <label htmlFor="toDate" style={labelStyles}>To Date</label>
                    <input
                        className="custom-date-input"
                        type="date"
                        id="toDate"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
});

DateRangeFilter.displayName = 'DateRangeFilter';