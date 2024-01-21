import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RoomItem from "./RoomItem/RoomItem";
import Image from "next/image";

const RoomsListTable = ({ rooms, setRooms, setActiveRoom }) => {
    // const handleRoomSave = (roomIndex, updatedRoom) => {
    //   const updatedRooms = [...rooms];
    //   updatedRooms[roomIndex] = updatedRoom;
    //   setRooms(updatedRooms);
    // };

    return (
        <TableContainer
            component={Paper}
            className="bg-white rounded-lg shadow shadow-lg"
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">№</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Назва</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Редагувати</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms?.map((room, index) => (
                        <RoomItem
                            room={room}
                            number={index + 1}
                            setActiveRoom={setActiveRoom}
                            setRooms={setRooms}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RoomsListTable;
