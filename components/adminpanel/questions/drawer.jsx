import { Drawer } from "@mui/material"
import { useForm } from "react-hook-form"
import Input from "@/components/UI/Input/Input"
import { Editor } from "@tinymce/tinymce-react"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { apiRequest } from "@/utils/apiRequest"
import Button from "@mui/material/Button"
import { useRouter } from "next/router"

const QuestionDrawer = ({ onClose, question, questions }) => {
    const router = useRouter()
    const isUpdate = !!question?.id
    const questionValues = {
        title: question?.title,
        title_ru: question?.title_ru,
        descr: question?.descr,
        descr_ru: question?.descr_ru,
        order: "",
    }

    const initialValues = {
        title: "",
        title_ru: "",
        descr: "",
        descr_ru: "",
        order: "",
    }

    const editorRef = useRef(null)
    const ruEditorRef = useRef(null)

    const defaultValues = isUpdate ? questionValues : initialValues

    const methods = useForm({
        defaultValues,
    })

    console.log(methods.watch())

    useEffect(() => {
        methods.reset(defaultValues)
    }, [question])

    const submitHandler = async (data) => {
        try {
            const questionsForUpdate = questions?.filter(
                (item) => item?.id !== question?.id
            )
            await toast.promise(
                apiRequest(
                    "/api/question",
                    {
                        ...data,
                        id: question?.id,
                        questions: isUpdate ? questionsForUpdate : questions,
                    },
                    isUpdate ? "PUT" : "POST"
                ),
                {
                    loading: isUpdate
                        ? "Оновлення питання..."
                        : "Створення питання...",
                    success: () => {
                        router.push("/questions")
                        return isUpdate
                            ? "Питання оновлено"
                            : "Питання створено"
                    },
                    error: "Помилка",
                }
            )
        } catch (e) {
            console.error(e)
        }
    }

    const deleteHandler = async () => {
        try {
            await toast.promise(
                apiRequest(
                    `/api/question?id=${question?.id}`,
                    undefined,
                    "DELETE"
                ),
                {
                    loading: "Видалення питання...",
                    success: () => {
                        router.push("/questions")
                        return "Питання видалено"
                    },
                    error: "Помилка",
                }
            )
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={"space-y-6"}>
            <div className={"text-2xl"}>
                {isUpdate ? "Редагувати питання" : "Створити питання"}
            </div>
            <Input
                className={"w-1/2"}
                name={"title"}
                control={methods.control}
                error={methods.formState.errors?.["title"]?.message}
                label={"Питання"}
            />
            <div>
                <Input
                    className={"w-1/2"}
                    name={"title_ru"}
                    control={methods.control}
                    error={methods.formState.errors?.["title_ru"]?.message}
                    label={"Питання RU"}
                />
            </div>

            <div>
                <Input
                    type={"number"}
                    className={"w-1/10"}
                    name={"order"}
                    control={methods.control}
                    error={methods.formState.errors?.["order"]?.message}
                    label={"Порядок"}
                />
            </div>
            <div className={"text-xl"}>Відповідь</div>
            <Editor
                apiKey={"q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"}
                style={{ zIndex: 65537 }}
                onInit={(editor) => (editorRef.current = editor)}
                onBlur={(focused, editor) =>
                    methods.setValue(`descr`, editor.getContent())
                }
                initialValue={defaultValues?.descr}
                init={{
                    selector: "textarea",
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        "toc",
                        "visualchars",
                        "hr",
                        "link",
                        "imagetools",
                        "autolink",
                        "nonbreaking",
                        "emoticons",
                        "imagetools",
                        "media",
                        "textpattern",
                        "wordcount",
                        "image",
                    ],
                    toolbar:
                        "undo redo | " +
                        "bold italic underline strikethrough | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "outdent indent | " +
                        "link image media | " +
                        +"bullist | numlist |" +
                        +"styleselect |" +
                        "charmap emoticons | " +
                        "code | " +
                        "table | " +
                        "fullscreen | " +
                        "styleselect |" +
                        " image",
                    menubar: "file edit view insert format tools table help",
                    toolbar_mode: "sliding",
                    contextmenu:
                        "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
                    visualblocks_default_state: true,
                    fontsize_formats:
                        "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
                    textpattern_patterns: [
                        { start: "*", end: "*", format: "italic" },
                        { start: "**", end: "**", format: "bold" },
                        { start: "#", format: "h1" },
                        { start: "##", format: "h2" },
                        { start: "###", format: "h3" },
                        { start: "####", format: "h4" },
                        { start: "#####", format: "h5" },
                        { start: "######", format: "h6" },
                        { start: "1. ", cmd: "InsertOrderedList" },
                        { start: "* ", cmd: "InsertUnorderedList" },
                        { start: "- ", cmd: "InsertUnorderedList" },
                    ],
                }}
            />

            <div className={"text-xl my-4"}>Відповідь RU</div>
            <Editor
                apiKey={"q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"}
                onInit={(editor) => (ruEditorRef.current = editor)}
                onBlur={(focused, editor) =>
                    methods.setValue(`descr_ru`, editor.getContent())
                }
                initialValue={defaultValues?.descr_ru}
                init={{
                    selector: "textarea",
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                        "toc",
                        "visualchars",
                        "hr",
                        "link",
                        "imagetools",
                        "autolink",
                        "nonbreaking",
                        "emoticons",
                        "imagetools",
                        "media",
                        "textpattern",
                        "wordcount",
                        "image",
                    ],
                    toolbar:
                        "undo redo | " +
                        "bold italic underline strikethrough | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "outdent indent | " +
                        "link image media | " +
                        +"bullist | numlist |" +
                        +"styleselect |" +
                        "charmap emoticons | " +
                        "code | " +
                        "table | " +
                        "fullscreen | " +
                        "styleselect |" +
                        " image",
                    menubar: "file edit view insert format tools table help",
                    toolbar_mode: "sliding",
                    contextmenu:
                        "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
                    visualblocks_default_state: true,
                    fontsize_formats:
                        "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
                    textpattern_patterns: [
                        { start: "*", end: "*", format: "italic" },
                        { start: "**", end: "**", format: "bold" },
                        { start: "#", format: "h1" },
                        { start: "##", format: "h2" },
                        { start: "###", format: "h3" },
                        { start: "####", format: "h4" },
                        { start: "#####", format: "h5" },
                        { start: "######", format: "h6" },
                        { start: "1. ", cmd: "InsertOrderedList" },
                        { start: "* ", cmd: "InsertUnorderedList" },
                        { start: "- ", cmd: "InsertUnorderedList" },
                    ],
                }}
            />
            <div className={"flex gap-6 items-center"}>
                <Button
                    onClick={methods.handleSubmit(submitHandler)}
                    variant={"contained"}
                >
                    Зберегти
                </Button>
                {isUpdate && (
                    <Button
                        onClick={deleteHandler}
                        color={"error"}
                        variant={"contained"}
                    >
                        Видалити
                    </Button>
                )}
            </div>
        </div>
    )
}

export default QuestionDrawer
