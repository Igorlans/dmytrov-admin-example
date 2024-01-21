import { TextField } from "@mui/material"
import { Controller } from "react-hook-form"

const Input = ({
    name,
    label,
    error,
    onChangeTrigger,
    className,
    control,
    rows,
    multiline,
    ...props
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <TextField
                    onChange={(e) => {
                        field.onChange(e)
                        onChangeTrigger && onChangeTrigger()
                    }}
                    className={className}
                    value={field.value}
                    onBlur={field.onBlur}
                    size={"small"}
                    color={"primary"}
                    label={label}
                    multiline={multiline}
                    rows={rows}
                    variant="outlined"
                    error={!!fieldState?.error?.message}
                    helperText={fieldState?.error?.message ?? ""}
                    {...props}
                />
            )}
        />
    )
}

export default Input
