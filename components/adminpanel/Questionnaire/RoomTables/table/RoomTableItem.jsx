import { Button, Switch, TableCell, TableRow } from "@mui/material";
import { tariffIds } from "@/utils/tariffIds";
import { buildingTypes } from "@/utils/buildingTypes";
import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/utils/apiRequest";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RoomTableItem = ({ table, setActiveTable, setTables, number }) => {
    const router = useRouter();
    const [checked, setChecked] = useState(table?.isActive || false);

    useEffect(() => {
        setChecked(table?.isActive);
    }, [table]);

    const handleSwitchChange = useCallback(
        debounce(async () => {
            const formData = {
                ...table,
                isActive: !checked,
            };
            console.log("FORM DATA", formData);
            try {
                await toast.promise(
                    apiRequest("/api/questionary/tables/room", formData, "PUT"),
                    {
                        loading: "Оновлення таблиці...",
                        success: (newTable) => {
                            setTables((prev) => {
                                return prev?.map((item) =>
                                    item.id === table?.id ? newTable : item
                                );
                            });
                            return `Таблиця оновлена`;
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

    const tariffes = table?.tariffes?.map((tariff) => tariffIds[tariff]);
    const types = table?.type?.map((type) => buildingTypes[type]);

    console.log("ITEM", table);

    return (
        <>
            <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell align="left">{number}</TableCell>
                <TableCell>{table?.text}</TableCell>
                <TableCell>{[...tariffes, ...types]?.join(", ")}</TableCell>
                <TableCell>
                    <Switch checked={checked} onChange={handleSwitchChange} />
                </TableCell>
                <TableCell>
                    <Button
                        onClick={() =>
                            router.push(`/questionary/roomTables/${table?.id}`)
                        }
                    >
                        Наповнення
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button onClick={() => setActiveTable(table)}>
                        Редагувати
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default RoomTableItem;
