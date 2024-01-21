import { Button, Switch, TableCell, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import { apiRequest } from "@/utils/apiRequest";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RoomItem = ({ room, setActiveRoom, setRooms, number }) => {
    const [checked, setChecked] = useState(room?.isActive || false);
    const router = useRouter();

    useEffect(() => {
        setChecked(room?.isActive);
    }, [room]);

    const handleSwitchChange = useCallback(
        debounce(async () => {
            const formData = {
                ...room,
                isActive: !checked,
            };
            console.log("FORM DATA", formData);
            try {
                await toast.promise(
                    apiRequest("/api/questionary/rooms", formData, "PUT"),
                    {
                        loading: "Оновлення приміщення...",
                        success: (newRoom) => {
                            setRooms((prev) => {
                                return prev?.map((item) =>
                                    item.id === newRoom?.id ? newRoom : item
                                );
                            });
                            return `Приміщення оновлено`;
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
                key={room?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell align="left">{number}</TableCell>
                <TableCell>
                    <div className="relative h-[24px] w-[24px]">
                        <Image src={room?.image?.url} alt={"room icon"} fill />
                    </div>
                </TableCell>
                <TableCell>{room?.name}</TableCell>
                <TableCell>
                    <Switch checked={checked} onChange={handleSwitchChange} />
                </TableCell>
                <TableCell align="center">
                    <Button
                        onClick={() =>
                            router.push(`/questionary/rooms/${room.id}`)
                        }
                    >
                        Наповнення
                    </Button>
                </TableCell>
                <TableCell align="right">
                    <Button onClick={() => setActiveRoom(room)}>
                        Редагувати
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

export default RoomItem;
