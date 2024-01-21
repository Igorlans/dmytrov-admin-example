import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RoomFurnitureItem from "@/components/adminpanel/Questionnaire/RoomsList/RoomFurniture/table/RoomFurnitureItem";

const RoomsFurnitureTable = ({
    furniture,
    setFurniture,
    setActiveFurniture,
}) => {
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
                        <TableCell>Підказка</TableCell>
                        <TableCell>Назва</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell align="right">Редагувати</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {furniture?.map((item, index) => (
                        <RoomFurnitureItem
                            number={index + 1}
                            setFurniture={setFurniture}
                            setActiveFurniture={setActiveFurniture}
                            furniture={item}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RoomsFurnitureTable;
