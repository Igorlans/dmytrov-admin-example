import { Button, Switch, TableCell, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { apiRequest } from "@/utils/apiRequest";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RoomFurnitureItem = ({
    furniture,
    setActiveFurniture,
    setFurniture,
    number,
}) => {
    const [checked, setChecked] = useState(furniture?.isActive || false);
    const router = useRouter();

    useEffect(() => {
        setChecked(furniture?.isActive);
    }, [furniture]);

    const handleSwitchChange = useCallback(
        debounce(async () => {
            const formData = {
                ...furniture,
                isActive: !checked,
            };
            console.log("FORM DATA", formData);
            try {
                await toast.promise(
                    apiRequest(
                        "/api/questionary/rooms/furniture",
                        formData,
                        "PUT"
                    ),
                    {
                        loading: "Оновлення наповнення...",
                        success: (newFurniture) => {
                            setFurniture((prev) => {
                                return prev?.map((item) =>
                                    item.id === furniture?.id
                                        ? newFurniture
                                        : item
                                );
                            });
                            return `Наповнення оновлено`;
                        },
                        error: (err) => err.message,
                    }
                );
            } catch (e) {
                console.log(e);
            }
        }, 500),
        [checked]
    );

    return (
        <>
            <TableRow
                key={furniture?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell align="left">{number}</TableCell>
                <TableCell>
                    <div
                        className="relative h-[200px] w-[200px] rounded-lg overflow-hidden"
                        style={{ border: "3px solid #ccc" }}
                    >
                        <Image
                            src={furniture?.image?.url}
                            alt={"room icon"}
                            fill
                        />
                    </div>
                </TableCell>
                <TableCell>{furniture?.hint}</TableCell>
                <TableCell>{furniture?.name}</TableCell>
                <TableCell>
                    <Switch checked={checked} onChange={handleSwitchChange} />
                </TableCell>
                <TableCell align="right">
                    <Button onClick={() => setActiveFurniture(furniture)}>
                        Редагувати
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default RoomFurnitureItem;
