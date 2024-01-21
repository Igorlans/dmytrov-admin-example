import { Button, Drawer } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/UI/Input/Input";
import Switch from "@/components/UI/Switch/Switch";
import { apiRequest } from "@/utils/apiRequest";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Cropper from "@/components/Cropper/Cropper";
import { questionaryFurnitureSchema } from "@/components/adminpanel/Questionnaire/RoomsList/RoomFurniture/table/RoomFurnitureForm/validation";
import SupabaseFileService from "@/components/Services/SupabaseFileService";
import { STORAGE_URL } from "@/config";
import { useRouter } from "next/navigation";

const RoomFurnitureForm = ({
    roomId,
    activeFurniture,
    onClose,
    setFurniture,
}) => {
    const [file, setFile] = useState(null);
    const isUpdate = !!activeFurniture?.id;

    console.log("FORM ACTIVE FURNITURE", activeFurniture);

    const defaultValues = {
        name: isUpdate ? activeFurniture?.name : "",
        order: "",
        hint: isUpdate ? activeFurniture?.hint : "",
        articleUrl: isUpdate ? activeFurniture?.articleUrl : "",
        isActive: isUpdate ? activeFurniture?.isActive : true,
    };

    const methods = useForm({
        mode: "onBlur",
        defaultValues: defaultValues,
        resolver: zodResolver(questionaryFurnitureSchema),
    });
    console.log("FORM VALUES", methods.watch());

    useEffect(() => {
        methods.reset(defaultValues);
        setFile(null);
    }, [activeFurniture]);

    const isActiveValue = methods.watch("isActive");
    const router = useRouter();
    const submitHandler = async (data) => {
        try {
            if (!file && !activeFurniture?.image?.url)
                return toast.error("Завантажте фото");

            const request = async () => {
                try {
                    let image;

                    if (file) {
                        const { path } = await SupabaseFileService.uploadFile(
                            file,
                            "images",
                            file.name,
                            "roomImages"
                        );

                        image = {
                            name: file.name,
                            url: `${STORAGE_URL}/${path}`,
                        };

                        if (isUpdate) {
                            const previousImage = activeFurniture?.image;
                            await SupabaseFileService.removeFile(
                                "images",
                                `roomImages/${previousImage.name}`
                            );
                        }
                    } else {
                        image = activeFurniture?.image;
                    }

                    const response = await apiRequest(
                        "/api/questionary/rooms/furniture",
                        isUpdate
                            ? {
                                  id: activeFurniture?.id,
                                  image,
                                  ...data,
                                  roomId,
                              }
                            : { image, roomId, ...data },
                        isUpdate ? "PUT" : "POST"
                    );
                    return response;
                } catch (e) {
                    throw e;
                }
            };

            await toast.promise(request(), {
                loading: isUpdate
                    ? "Оновлення наповнення..."
                    : "Створення наповнення...",
                success: (newFurniture) => {
                    if (isUpdate) {
                        router.replace(`/questionary/rooms/${roomId}`);
                        methods.reset(defaultValues);
                        onClose();
                        return "Наповнення оновлено";
                    } else {
                        router.replace(`/questionary/rooms/${roomId}`);
                        methods.reset(defaultValues);
                        onClose();
                        return "Наповнення створено";
                    }
                },
                error: isUpdate
                    ? "Помилка оновлення наповнення"
                    : "Помилка створення наповнення",
            });
        } catch (e) {
            console.error(e);
        }
    };

    const deleteHandler = async () => {
        try {
            const request = async () => {
                try {
                    const previousImage = activeFurniture?.image;
                    await SupabaseFileService.removeFile(
                        "images",
                        `roomImages/${previousImage.name}`
                    );
                    await apiRequest(
                        `/api/questionary/rooms/furniture?id=${activeFurniture?.id}`,
                        undefined,
                        "DELETE"
                    );
                } catch (e) {
                    throw e;
                }
            };
            await toast.promise(request(), {
                loading: "Видалення наповнення...",
                success: () => {
                    setFurniture((prev) => {
                        return prev?.filter(
                            (quest) => quest.id !== activeFurniture?.id
                        );
                    });
                    methods.reset();
                    onClose();
                    return "Наповнення видалено";
                },
                error: "Помилка видалення наповнення",
            });
        } catch (e) {
            console.error(e);
        }
    };

    console.log("ERRORS", methods.formState.errors);

    return (
        <Drawer
            style={{ zIndex: 2334 }}
            open={!!activeFurniture}
            anchor={"right"}
            onClose={onClose}
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
        >
            <div className="flex flex-col gap-10">
                <div className="text-bold text-2xl">
                    {isUpdate ? "Оновлення наповнення" : "Створення наповнення"}
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
                    label={"Назва наповнення"}
                    error={methods.formState?.errors?.["name"]?.message}
                />
                <Input
                    control={methods.control}
                    name={"hint"}
                    label={"Підказка"}
                    error={methods.formState?.errors?.["hint"]?.message}
                />
                <Input
                    control={methods.control}
                    name={"articleUrl"}
                    label={"Посилання на статтю"}
                    error={methods.formState?.errors?.["articleUrl"]?.message}
                />
                <Input
                    control={methods.control}
                    name={"order"}
                    label={"Порядок"}
                    error={methods.formState?.errors?.["order"]?.message}
                />
                <div className="flex justify-end">
                    <Cropper
                        aspect={1}
                        file={file}
                        setFile={setFile}
                        height={200}
                        width={200}
                        placeholder={activeFurniture?.image?.url || undefined}
                    />
                </div>

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

export default RoomFurnitureForm;
