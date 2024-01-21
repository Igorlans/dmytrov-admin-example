import { useEffect, useState } from "react";
import RoomsListTable from "./Table/RoomsListTable";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import { Button } from "@mui/material";
import RoomForm from "@/components/adminpanel/Questionnaire/RoomsList/RoomForm/RoomForm";

const RoomsList = ({ rooms: initRooms }) => {
    const [rooms, setRooms] = useState(initRooms || []);
    const [activeRoom, setActiveRoom] = useState(null);

    useEffect(() => {
        setRooms(initRooms);
    }, [initRooms]);

    return (
        <>
            <div className="flex justify-between items-center">
                <TitlePage title="Список приміщень" />
                <Button onClick={() => setActiveRoom({})}>Створити</Button>
            </div>
            <RoomsListTable
                rooms={rooms}
                setRooms={setRooms}
                setActiveRoom={setActiveRoom}
            />
            <RoomForm
                activeRoom={activeRoom}
                setRooms={setRooms}
                onClose={() => setActiveRoom(null)}
            />
        </>
    );
};

export default RoomsList;
