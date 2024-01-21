import { Button, Drawer } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionaryQuestionSchema } from "@/components/adminpanel/Questionnaire/TextQuestions/QuestionForm/validation";
import Input from "@/components/UI/Input/Input";
import Filters from "@/components/adminpanel/Questionnaire/Filters/Filters";
import Switch from "@/components/UI/Switch/Switch";
import { apiRequest } from "@/utils/apiRequest";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { buildingTypeFilters, tariffFilters } from "@/utils/filtersData";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const QuestionForm = ({ activeQuestion, onClose, setQuestions }) => {
    const isUpdate = !!activeQuestion?.id;

    console.log("FORM ACTIVE QUESTION", activeQuestion);

    const defaultValues = {
        text: isUpdate ? activeQuestion?.text : "",
        hint: isUpdate ? activeQuestion?.hint : "",
        order: "",
        isActive: isUpdate ? activeQuestion?.isActive : true,
        type: isUpdate ? activeQuestion?.type : [],
        tariffes: isUpdate ? activeQuestion?.tariffes : [],
    };

    const methods = useForm({
        mode: "onBlur",
        defaultValues: defaultValues,
        resolver: zodResolver(questionaryQuestionSchema),
    });
    console.log("FORM VALUES", methods.watch());

    useEffect(() => {
        methods.reset(defaultValues);
    }, [activeQuestion]);

    const typeValues = methods.watch("type");
    const tariffValues = methods.watch("tariffes");
    const isActiveValue = methods.watch("isActive");

    const router = useRouter();

    const submitHandler = async (data) => {
        try {
            await toast.promise(
                apiRequest(
                    "/api/questionary/questions",
                    isUpdate ? { id: activeQuestion?.id, ...data } : data,
                    isUpdate ? "PUT" : "POST"
                ),
                {
                    loading: isUpdate
                        ? "Оновлення питання..."
                        : "Створення питання...",
                    success: (newQuestion) => {
                        if (isUpdate) {
                            router.replace("/questionary/questions");
                            methods.reset(defaultValues);
                            onClose();
                            return "Питання оновлено";
                        } else {
                            router.replace("/questionary/questions");
                            methods.reset(defaultValues);
                            onClose();
                            return "Питання створено";
                        }
                    },
                    error: isUpdate
                        ? "Помилка оновлення питання"
                        : "Помилка створення питання",
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
                    `/api/questionary/questions?id=${activeQuestion?.id}`,
                    undefined,
                    "DELETE"
                ),
                {
                    loading: "Видалення питання...",
                    success: () => {
                        setQuestions((prev) => {
                            return prev?.filter(
                                (quest) => quest.id !== activeQuestion?.id
                            );
                        });
                        methods.reset();
                        onClose();
                        return "Питання видалено";
                    },
                    error: "Помилка видалення питання",
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
            open={!!activeQuestion}
            anchor={"right"}
            onClose={onClose}
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
        >
            <div className="flex flex-col gap-10">
                <div className="text-bold text-2xl">
                    {isUpdate ? "Оновлення питання" : "Створення питання"}
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
                    label={"Текст питання"}
                    error={methods.formState?.errors?.["text"]?.message}
                />
                <Input
                    control={methods.control}
                    name={"hint"}
                    label={"Текст підсказки"}
                    error={methods.formState?.errors?.["hint"]?.message}
                />
                <Input
                    control={methods.control}
                    name={"order"}
                    label={"Порядок"}
                    type={"number"}
                    error={methods.formState?.errors?.["order"]?.message}
                />
                <div>
                    <Filters
                        callback={() => methods.trigger("type")}
                        label={"Тип об'єкту"}
                        selectedFilters={typeValues}
                        filterItems={buildingTypeFilters}
                        setSelectedFilters={(newValue) =>
                            methods.setValue("type", newValue)
                        }
                    />
                    <div className="mt-2 text-xs text-red-500">
                        {methods.formState?.errors?.["type"]?.message ?? (
                            <div>
                                {methods.formState?.errors?.["type"]?.message}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Filters
                        callback={() => methods.trigger("tariffes")}
                        label={"Тариф"}
                        filterItems={tariffFilters}
                        selectedFilters={tariffValues}
                        setSelectedFilters={(newValue) =>
                            methods.setValue("tariffes", newValue)
                        }
                    />
                    <div className="mt-2 text-xs text-red-500">
                        {methods.formState?.errors?.["tariffes"]?.message ?? (
                            <div>
                                {
                                    methods.formState?.errors?.["tariffes"]
                                        ?.message
                                }
                            </div>
                        )}
                    </div>
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

export default QuestionForm;
