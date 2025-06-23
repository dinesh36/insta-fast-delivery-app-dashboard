import React, {useState, useEffect} from 'react';
import {Button, Stack, Box, Select, InputLabel, FormControl, MenuItem} from '@mui/material';
import {IAfterGuiAttachedParams, IDoesFilterPassParams} from "ag-grid-community";
import {CustomFilterProps, useGridFilter} from "ag-grid-react";
import {CITY_FILTER_OPTIONS, DELIVER_DELAY_STATE_OPTIONS, STATUS_FILTER_OPTIONS} from "@/utils/constant";

const filterOptionsMap = {
    city: CITY_FILTER_OPTIONS,
    status: STATUS_FILTER_OPTIONS,
    isDelayed: DELIVER_DELAY_STATE_OPTIONS
}

export const OptionsFilter = (props: CustomFilterProps) => {
    const { model, onModelChange, colDef } = props;
    const [selectedValue, setSelectedValue] = useState('');
    const [closeFilter, setCloseFilter] = useState<(() => void) | undefined>();

    const doesFilterPass = () => true;

    const afterGuiAttached = ({ hidePopup }: IAfterGuiAttachedParams) => {
        setCloseFilter(() => hidePopup);
    };

    useGridFilter({
        doesFilterPass,
        afterGuiAttached,
    });

    useEffect(() => {
        setSelectedValue(model ?? '');
    }, [model]);

    const handleSearch = () => {
        closeFilter?.();
        onModelChange(selectedValue || null);
    };

    const handleReset = () => {
        closeFilter?.();
        setSelectedValue('');
        onModelChange(null);
    };

    //TODO fix this one, currently setting this because the modal is closing on click of the selected item
    const onChangeOption = (e) => {
        setSelectedValue(e.target.value);
        onModelChange(e.target.value || null);
        closeFilter?.()
    }

    return (
        <Stack spacing={1} padding={1}>
            <FormControl size="small" fullWidth>
                <InputLabel>{colDef.headerName}</InputLabel>
                <Select
                    label={colDef.headerName}
                    value={selectedValue || ''}
                    onChange={onChangeOption}
                >
                    {filterOptionsMap[colDef.field].map((option) => (
                        <MenuItem key={option.value || 'all'} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box display="flex" gap={1} justifyContent="flex-end">
                <Button variant="outlined" onClick={handleReset}>
                    Reset
                </Button>
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Stack>
    );
};

