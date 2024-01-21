import { Controller } from "react-hook-form";
import { Switch as MUISwitch } from "@mui/material";

const Switch = ({ name, control }) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <>
                    <MUISwitch
                        checked={field.value}
                        value={field.value} // Use value instead of defaultChecked
                        onChange={(e) => field.onChange(e.target.checked)} // Update the field value when the switch is toggled
                    />
                </>
            )}
        />
    );
};

export default Switch;
