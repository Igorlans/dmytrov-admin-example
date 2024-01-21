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
import SupabaseFileService from "@/components/Services/SupabaseFileService";
import { STORAGE_URL } from "@/config";
import { questionaryTableOptionSchema } from "@/components/adminpanel/Questionnaire/TableOptions/table/validation";
import { useRouter } from "next/navigation";

const TableOptionsForm = ({
    tableId,
    activeOption,
    onClose,
    setOptions,
    isRoomTable,
}) => {
    const [file, setFile] = useState(null);
    const isUpdate = !!activeOption?.id;
    const router = useRouter();
    console.log("FORM ACTIVE OPTION", activeOption);

    const defaultValues = {
        text: isUpdate ? activeOption?.text : "",
        order: "",
        articleUrl: isUpdate ? activeOption?.articleUrl : "",
        isActive: isUpdate ? activeOption?.isActive : true,
    };

    const methods = useForm({
        mode: "onBlur",
        defaultValues: defaultValues,
        resolver: zodResolver(questionaryTableOptionSchema),
    });
    console.log("FORM VALUES", methods.watch());

    useEffect(() => {
        methods.reset(defaultValues);
        setFile(null);
    }, [activeOption]);

    const isActiveValue = methods.watch("isActive");

    const submitHandler = async (data) => {
        try {
            if (!file && !activeOption?.image?.url)
                return toast.error("Завантажте фото");

            const request = async () => {
                try {
                    let image;

                    if (file) {
                        const { path } = await SupabaseFileService.uploadFile(
                            file,
                            "images",
                            file.name,
                            "optionImages"
                        );

                        image = {
                            name: file.name,
                            url: `${STORAGE_URL}/${path}`,
                        };

                        if (isUpdate) {
                            const previousImage = activeOption?.image;
                            await SupabaseFileService.removeFile(
                                "images",
                                `optionImages/${previousImage.name}`
                            );
                        }
                    } else {
                        image = activeOption?.image;
                    }

                    const tableIdObject = isRoomTable
                        ? { roomTableId: tableId }
                        : { tableId: tableId };

                    const response = await apiRequest(
                        "/api/questionary/tables/options",
                        isUpdate
                            ? {
                                  id: activeOption?.id,
                                  image,
                                  ...tableIdObject,
                                  ...data,
                              }
                            : { image, ...tableIdObject, ...data },
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
                success: (newOption) => {
                    if (isUpdate) {
                        isRoomTable
                            ? router.replace(
                                  `/questionary/roomTables/${tableId}`
                              )
                            : router.replace(`/questionary/tables/${tableId}`);
                        methods.reset();
                        onClose();
                        return "Наповнення оновлено";
                    } else {
                        isRoomTable
                            ? router.replace(
                                  `/questionary/roomTables/${tableId}`
                              )
                            : router.replace(`/questionary/tables/${tableId}`);
                        methods.reset();
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
                    const previousImage = activeOption?.image;
                    await SupabaseFileService.removeFile(
                        "images",
                        `optionImages/${previousImage.name}`
                    );
                    await apiRequest(
                        `/api/questionary/tables/options?id=${activeOption?.id}`,
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
                    setOptions((prev) => {
                        return prev?.filter(
                            (item) => item.id !== activeOption?.id
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
            open={!!activeOption}
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
                    name={"text"}
                    label={"Назва"}
                    error={methods.formState?.errors?.["text"]?.message}
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
                        placeholder={activeOption?.image?.url || undefined}
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

export default TableOptionsForm;
