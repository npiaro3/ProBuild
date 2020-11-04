import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value, error = null, onChange, options } = props;

    return (
        <FormControl
            variant="outlined"
            {...(error && { error: true })}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">--Select a Skill--</MenuItem>
                {
                    typeof options !== 'undefined' ?
                        options.map(
                            (item, index) => (<MenuItem key={index} value={item.name}>{item.name}</MenuItem>)
                        ) : null
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}