import classes from "./criterionItemsModal.module.scss";
import TextField from "@mui/material/TextField";
import { Drawer, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const CriterionItemsModal = ({
    activeItem,
    setActiveItem,
    isVisible,
    setIsVisible,
    items,
    setItems,
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (activeItem) {
            setTitle(activeItem.name);
            setDescription(activeItem.description);
            setPrice(activeItem.price);
        } else {
            setTitle("");
            setDescription("");
            setPrice("");
        }
    }, [activeItem]);

    const addCriterion = () => {
        if (activeItem) {
            const newItems = items.map((item) =>
                item.id === activeItem.id
                    ? {
                          ...item,
                          name: title,
                          description: description,
                          price: price,
                      }
                    : item
            );
            setItems(newItems);
            setIsVisible(false);
            setTitle("");
            setDescription("");
            setPrice("");
            setActiveItem(null);
            return;
        }
        const newItem = {
            id: Date.now(),
            name: title,
            price: price,
            description: description,
        };
        setItems([...items, newItem]);
        setIsVisible(false);
        setTitle("");
        setDescription("");
        setPrice("");
        setActiveItem(null);
    };

    const handleClose = () => {
        setActiveItem(null);
        setIsVisible(false);
    };

    return (
        <Drawer
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
            anchor={"right"}
            open={isVisible}
            onClose={handleClose}
        >
            <div className={classes.criterionItemsModal}>
                <div className={classes.title}>
                    {activeItem ? "Змінити критерію" : "Додати критерію"}
                </div>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size={"small"}
                    label={"Назва"}
                    variant="outlined"
                />

                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">₴</InputAdornment>
                        ),
                    }}
                    type="number"
                    size={"small"}
                    label="Ціна"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <TextField
                    inputProps={{
                        style: { height: 100, width: 300 },
                    }}
                    label={"Опис"}
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button variant="contained" onClick={addCriterion}>
                    {activeItem ? "Змінити" : "Додати"}
                </Button>
            </div>
        </Drawer>
    );
};

export default CriterionItemsModal;
