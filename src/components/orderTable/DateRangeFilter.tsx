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
        padding: '16px',
        width: '280px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    };

    const inputContainerStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    };

    const fieldGroupStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    };

    const labelStyles: React.CSSProperties = {
        fontSize: '14px',
        color: '#666',
        fontWeight: 500
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