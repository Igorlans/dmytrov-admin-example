import { Button, Drawer } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/UI/Input/Input";
import Switch from "@/components/UI/Switch/Switch";
import { apiRequest } from "@/utils/apiRequest";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { questionaryRoomSchema } from "@/components/adminpanel/Questionnaire/RoomsList/RoomForm/validation";
import { useRouter } from "next/navigation";

const RoomForm = ({ activeRoom, onClose, setRooms }) => {
    const isUpdate = !!activeRoom?.id;

    console.log("FORM ACTIVE ROOM", activeRoom);

    const defaultValues = {
        imageUrl: isUpdate ? activeRoom?.image?.url : "",
        name: isUpdate ? activeRoom?.name : "",
        order: "",
        isActive: isUpdate ? activeRoom?.isActive : true,
    };

    const methods = useForm({
        mode: "onBlur",
        defaultValues: defaultValues,
        resolver: zodResolver(questionaryRoomSchema),
    });
    console.log("FORM VALUES", methods.watch());

    useEffect(() => {
        methods.reset(defaultValues);
    }, [activeRoom]);

    const isActiveValue = methods.watch("isActive");
    const router = useRouter();

    const submitHandler = async (data) => {
        try {
            await toast.promise(
                apiRequest(
                    "/api/questionary/rooms",
                    isUpdate
                        ? {
                              id: activeRoom?.id,
                              image: { url: data.imageUrl },
                              ...data,
                          }
                        : { image: { url: data.imageUrl }, ...data },
                    isUpdate ? "PUT" : "POST"
                ),
                {
                    loading: isUpdate
                        ? "Оновлення приміщення..."
                        : "Створення приміщення...",
                    success: (newRoom) => {
                        if (isUpdate) {
                            router.replace("/questionary/rooms");
                            methods.reset();
                            onClose();
                            return "Приміщення оновлено";
                        } else {
                            router.replace("/questionary/rooms");

                            methods.reset();
                            onClose();
                            return "Приміщення створено";
                        }
                    },
                    error: isUpdate
                        ? "Помилка оновлення приміщення"
                        : "Помилка створення приміщення",
                }
            );
        } catch (e) {
            console.error(e);
        }
    };

    const deleteHandler = async () => {
        try {
            await toast.promise(
                apiRequest(
                    `/api/questionary/rooms?id=${activeRoom?.id}`,
                    undefined,
                    "DELETE"
                ),
                {
                    loading: "Видалення приміщення...",
                    success: () => {
                        setRooms((prev) => {
                            return prev?.filter(
                                (quest) => quest.id !== activeRoom?.id
                            );
                        });
                        methods.reset();
                        onClose();
                        return "Приміщення видалено";
                    },
                    error: "Помилка видалення приміщення",
                }
            );
        } catch (e) {
            console.error(e);
        }
    };

    console.log("ERRORS", methods.formState.errors);

    return (
        <Drawer
            style={{ zIndex: 2334 }}
            open={!!activeRoom}
            anchor={"right"}
            onClose={onClose}
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
        >
            <div className="flex flex-col gap-10">
                <div className="text-bold text-2xl">
                    {isUpdate ? "Оновлення приміщення" : "Створення приміщення"}
                </div>
                <div className="flex gap-5 items-center">
                    <div>Статус</div>
                    <Switch
                        control={methods.control}
                        name={"isActive"}
                        methods={methods}
                        defaultValue={isActiveValue}
                    />
                </div>
                <Input
                    control={methods.control}
                    name={"name"}
                    label={"Назва приміщення"}
                    error={methods.formState?.errors?.["name"]?.message}
                />
                <Input
                    control={methods.control}
                    name={"imageUrl"}
                    label={"URL картинки"}
                    error={methods.formState?.errors?.["imageUrl"]?.message}
                />
                <Input
                    control={methods.control}
                    name={"order"}
                    label={"Порядок"}
                    error={methods.formState?.errors?.["order"]?.message}
                />

                <div
                    className={`flex ${
                        isUpdate ? "justify-between" : "justify-end"
                    } items-center`}
                >
                    {isUpdate && (
                        <Button
                            onClick={deleteHandler}
                            variant="contained"
                            color="error"
                            startIcon={<FaTrash size={15} />}
                        >
                            Видалити
                        </Button>
                    )}

                    <Button
                        onClick={methods.handleSubmit(submitHandler)}
                        variant="contained"
                    >
                        Зберегти
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default RoomForm;
