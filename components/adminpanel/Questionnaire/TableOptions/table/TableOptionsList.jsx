import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableOptionsItem from "@/components/adminpanel/Questionnaire/TableOptions/table/TableOptionsItem";

const TableOptionsList = ({ options, setOptions, setActiveOption }) => {
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
                        <TableCell>Посилання на статтю</TableCell>
                        <TableCell>Назва</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell align="right">Редагувати</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {options?.map((item, index) => (
                        <TableOptionsItem
                            key={item?.id}
                            number={index + 1}
                            setActiveOption={setActiveOption}
                            option={item}
                            setOptions={setOptions}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableOptionsList;
