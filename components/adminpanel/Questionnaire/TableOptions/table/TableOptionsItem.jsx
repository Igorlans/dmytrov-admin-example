import { Button, Switch, TableCell, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { apiRequest } from "@/utils/apiRequest";
import Image from "next/image";

const TableOptionItem = ({ option, setActiveOption, setOptions, number }) => {
    const [checked, setChecked] = useState(option?.isActive || false);

    useEffect(() => {
        setChecked(option?.isActive);
    }, [option]);

    const handleSwitchChange = useCallback(
        debounce(async () => {
            const formData = {
                ...option,
                isActive: !checked,
            };
            console.log("FORM DATA", formData);
            try {
                await toast.promise(
                    apiRequest(
                        "/api/questionary/tables/options",
                        formData,
                        "PUT"
                    ),
                    {
                        loading: "Оновлення наповнення...",
                        success: (newOption) => {
                            setOptions((prev) => {
                                return prev?.map((item) =>
                                    item.id === option?.id ? newOption : item
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell align="left">{number}</TableCell>
                <TableCell>
                    {option?.image?.url && (
                        <div
                            className="relative h-[200px] w-[200px] rounded-lg overflow-hidden"
                            style={{ border: "3px solid #ccc" }}
                        >
                            <Image
                                src={option?.image?.url}
                                alt={"room icon"}
                                fill
                            />
                        </div>
                    )}
                </TableCell>
                <TableCell>{option?.articleUrl || "Немає"}</TableCell>
                <TableCell>{option?.text}</TableCell>
                <TableCell>
                    <Switch checked={checked} onChange={handleSwitchChange} />
                </TableCell>
                <TableCell align="right">
                    <Button onClick={() => setActiveOption(option)}>
                        Редагувати
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableOptionItem;
