import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function SelectForm({
    id,
    label,
    options,
    value,
    name,
    onChange,
    onBlur,
    error,
    helperText,
}) {
    return (
        <FormControl fullWidth error={Boolean(error)}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>

            <Select
                label={label}
                value={value ?? ""}   /* ✅ prevent null */
                labelId={`${id}-label`}
                id={id}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>

            {helperText && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
}
