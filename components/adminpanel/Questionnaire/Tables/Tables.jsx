import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import TableList from "@/components/adminpanel/Questionnaire/Tables/table/TableList";
import TableForm from "@/components/adminpanel/Questionnaire/Tables/table/TableForm";

const Tables = ({ tables: initTables }) => {
    const [tables, setTables] = useState(initTables || []);
    const [activeTable, setActiveTable] = useState(null);

    useEffect(() => {
        setTables(initTables);
    }, [initTables]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <TitlePage title="Таблиці без приміщень" />
                <Button onClick={() => setActiveTable({})}>Створити</Button>
            </div>
            <TableList
                tables={tables}
                setActiveTable={setActiveTable}
                setTables={setTables}
            />
            <TableForm
                activeTable={activeTable}
                setTables={setTables}
                onClose={() => setActiveTable(null)}
            />
        </div>
    );
};

export default Tables;
