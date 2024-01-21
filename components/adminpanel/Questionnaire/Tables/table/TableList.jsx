import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableItem from "@/components/adminpanel/Questionnaire/Tables/table/TableItem";

const TableList = ({ tables, setTables, setActiveTable }) => {
    return (
        <TableContainer
            component={Paper}
            className="bg-white rounded-lg shadow shadow-lg"
        >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">№</TableCell>
                        <TableCell>Назва</TableCell>
                        <TableCell>Підказка</TableCell>
                        <TableCell>Фільтр</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Редагувати</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tables?.map((table, index) => (
                        <TableItem
                            key={table.id}
                            number={index + 1}
                            table={table}
                            setTables={setTables}
                            setActiveTable={setActiveTable}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableList;
