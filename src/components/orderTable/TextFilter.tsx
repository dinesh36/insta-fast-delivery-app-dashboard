import React, {useState, useEffect} from 'react';
import {TextField, Button, Stack, Box} from '@mui/material';
import {IAfterGuiAttachedParams, IDoesFilterPassParams} from "ag-grid-community";
import {CustomFilterProps, useGridFilter} from "ag-grid-react";

export const TextFilter = (props: CustomFilterProps) => {
    const {model, onModelChange} = props;
    const [searchValue, setSearchValue] = useState('');
    const [closeFilter, setCloseFilter] = useState<(() => void) | undefined>();

    const doesFilterPass = ()=> true;

    const afterGuiAttached = ({ hidePopup }: IAfterGuiAttachedParams) => {
        setCloseFilter(() => hidePopup);
    }

    useGridFilter({
        doesFilterPass,
        afterGuiAttached
    });

    useEffect(()=>{
        setSearchValue(model);
    }, [model])

    const handleSearch = () => {
        closeFilter?.();
        onModelChange(searchValue || null);
    };

    const handleReset = () =>{
        closeFilter?.();
        setSearchValue('');
        onModelChange(null);
    }

    return (
        <Stack spacing={1} padding={1}>
            <TextField
                size="small"
                label="Search"
                value={searchValue || ''}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Box display="flex" gap={1} justifyContent={"flex-end"}>
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

