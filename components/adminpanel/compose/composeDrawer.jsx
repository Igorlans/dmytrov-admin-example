import { Button, Checkbox, Drawer, TextField } from "@mui/material"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import { GridDeleteIcon } from "@mui/x-data-grid"
import { useState } from "react"

const ComposeDrawer = ({
    isOpen,
    onClose,
    selectedCompose,
    onSave,
    onDelete,
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState(selectedCompose.text)
    const [nameRu, setNameRu] = useState(selectedCompose.text_ru)

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleSave = (event) => {
        event.preventDefault()

        setIsLoading(true)

        const updatedItem = {
            ...selectedCompose,
            text: name,
            text_ru: nameRu,
        }

        onSave(updatedItem)

        setIsLoading(false)
        onClose()
    }

    const handleDelete = () => {
        onDelete(selectedCompose)
        onClose()
    }

    return (
        <Drawer
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <div style={{ padding: "0px 20px", minWidth: "600px" }}>
                <div className="full-width mb-5">
                    <TextField
                        label="Назва"
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Назва RU"
                        value={nameRu}
                        onChange={(e) => setNameRu(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div className="flex justify-between">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={!name && !nameRu}
                    >
                        Зберегти
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<GridDeleteIcon />}
                        onClick={handleDelete}
                    >
                        Видалити
                    </Button>
                </div>
            </div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1000000,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Drawer>
    )
}

export default ComposeDrawer
