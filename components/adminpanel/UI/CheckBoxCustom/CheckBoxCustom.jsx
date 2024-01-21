"use client"

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Controller, useFormContext} from "react-hook-form";


const CheckBoxCustom = ({name, label, style}) => {
    const methods = useFormContext();

    return (
        <FormGroup>
            <Controller
                name={name}
                control={methods.control}
                defaultValue={false}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} />}
                        label={label}
                    />
                )}
            />
        </FormGroup>
      );
}

export default CheckBoxCustom