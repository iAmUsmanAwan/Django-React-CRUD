import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText  from '@mui/material/FormHelperText';

export default function SelectForm({ label, options, value, name, onChange, onBlur, error, helperText }) {

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}

                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}

                error={error}
                helperText={helperText}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </FormControl>
    );
}
