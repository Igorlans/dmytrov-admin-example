import Conditions from "@/components/adminpanel/Questionnaire/Filters/Filters";
import { Button, Checkbox, Drawer, Switch, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useState } from "react";

const EditDrawer = ({ question, open, setOpen, onSave }) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => setOpen(false)} // закриває дверцята при кліку на сіру зону
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
        >
            <div>
                <div className="flex justify-between">
                    <Switch defaultChecked />
                    <Button variant="contained" color="primary">
                        Зберегти
                    </Button>
                </div>

                <div className="full-width mb-5">
                    <TextField
                        label="Назва приміщення"
                        fullWidth
                        margin="normal"
                    />
                </div>

                <div className="flex justify-end my-10">
                    <Button variant="contained" startIcon={<GridDeleteIcon />}>
                        Видалити
                    </Button>
                </div>
            </div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1000000,
                }}
                onClick={() => setOpen(false)} // закриває дверцята при кліку на сіру зону
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Drawer>
    );
};

export default EditDrawer;
