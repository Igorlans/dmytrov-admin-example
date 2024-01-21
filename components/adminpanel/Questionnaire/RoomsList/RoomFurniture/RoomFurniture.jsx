import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RoomFurnitureTable from "@/components/adminpanel/Questionnaire/RoomsList/RoomFurniture/table/RoomFurnitureTable";
import Button from "@mui/material/Button";
import RoomFurnitureForm from "@/components/adminpanel/Questionnaire/RoomsList/RoomFurniture/table/RoomFurnitureForm/RoomFurnitureForm";

const RoomFurniture = ({ room }) => {
    const router = useRouter();

    const [furniture, setFurniture] = useState(room?.RoomFurniture || []);
    const [activeFurniture, setActiveFurniture] = useState(null);

    useEffect(() => {
        setFurniture(room?.RoomFurniture || []);
    }, [room]);

    return (
        <div>
            <FaArrowLeft
                className="cursor-pointer"
                onClick={() => router.back()}
                size={40}
            />
            <div className="flex gap-8 justify-between items-center">
                <div className="flex gap-8 items-center">
                    <div className="relative h-[30px] w-[30px]">
                        <Image src={room?.image?.url} alt={"room image"} fill />
                    </div>
                    <TitlePage
                        title={`Наповення приміщенння "${room?.name}"`}
                    />
                </div>
                <Button onClick={() => setActiveFurniture({})}>Створити</Button>
            </div>
            <RoomFurnitureTable
                furniture={furniture}
                setActiveFurniture={setActiveFurniture}
                setFurniture={setFurniture}
            />
            <RoomFurnitureForm
                roomId={room?.id}
                setFurniture={setFurniture}
                activeFurniture={activeFurniture}
                onClose={() => setActiveFurniture(null)}
            />
        </div>
    );
};

export default RoomFurniture;
