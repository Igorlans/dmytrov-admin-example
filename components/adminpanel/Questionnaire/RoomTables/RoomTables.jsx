import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import RoomTableList from "@/components/adminpanel/Questionnaire/RoomTables/table/RoomTableList";
import RoomTableForm from "@/components/adminpanel/Questionnaire/RoomTables/table/RoomTableForm";

const RoomTables = ({ tables: initTables }) => {
    const [tables, setTables] = useState(initTables || []);
    const [activeTable, setActiveTable] = useState(null);

    useEffect(() => {
        setTables(initTables);
    }, [initTables]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <TitlePage title="Таблиці з приміщеннями" />
                <Button onClick={() => setActiveTable({})}>Створити</Button>
            </div>
            <RoomTableList
                tables={tables}
                setActiveTable={setActiveTable}
                setTables={setTables}
            />
            <RoomTableForm
                activeTable={activeTable}
                setTables={setTables}
                onClose={() => setActiveTable(null)}
            />
        </div>
    );
};

export default RoomTables;
