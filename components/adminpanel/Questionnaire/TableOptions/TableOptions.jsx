import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TableOptionsList from "@/components/adminpanel/Questionnaire/TableOptions/table/TableOptionsList";
import TableOptionsForm from "@/components/adminpanel/Questionnaire/TableOptions/table/TableOptionsForm";

const TableOptions = ({ table, isRoomTable }) => {
    const router = useRouter();

    const [options, setOptions] = useState(table?.options || []);
    const [activeOption, setActiveOption] = useState(null);

    useEffect(() => {
        setOptions(table?.options || []);
    }, [table]);

    return (
        <div>
            <FaArrowLeft
                className="cursor-pointer"
                onClick={() => router.back()}
                size={40}
            />
            <div className="flex gap-8 justify-between items-center">
                <TitlePage title={`Наповення таблиці "${table?.text}"`} />
                <Button onClick={() => setActiveOption({})}>Створити</Button>
            </div>
            <TableOptionsList
                setActiveOption={setActiveOption}
                setOptions={setOptions}
                options={options}
            />
            <TableOptionsForm
                setOptions={setOptions}
                tableId={table.id}
                activeOption={activeOption}
                isRoomTable={isRoomTable}
                onClose={() => setActiveOption(null)}
            />
        </div>
    );
};

export default TableOptions;
