import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import { Button } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast from "react-hot-toast"
import { apiRequest } from "@/utils/apiRequest"
import Input from "@/components/UI/Input/Input"
import { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { useRouter } from "next/navigation"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

const seoValidation = z.object({
    page: z.string().nonempty("Поле обовʼязкове"),
    title: z.string().nonempty("Поле обовʼязкове"),
    title_ru: z.string().optional(),
    description: z.string().nonempty("Поле обовʼязкове"),
    description_ru: z.string().optional(),
    keywords: z.string().optional(),
    seoTitle: z.string().nonempty("Поле обовʼязкове"),
    seoTitle_ru: z.string().optional(),
    seoText: z.string().nonempty("Поле обовʼязкове"),
    seoText_ru: z.string().optional(),
    hideSeoText: z.boolean().optional(),
})

const SeoForm = ({ seoItem }) => {
    const router = useRouter()

    const isUpdate = !!seoItem?.id
    const editorRef = useRef(null)
    const ruEditorRef = useRef(null)

    const initValues = {
        page: "",
        title: "",
        title_ru: "",
        description: "",
        description_ru: "",
        keywords: "",
        seoTitle: "",
        seoTitle_ru: "",
        seoText: "",
        seoText_ru: "",
        hideSeoText: false,
    }

    const seoValues = {
        page: seoItem?.page,
        title: seoItem?.title || "",
        title_ru: seoItem?.title_ru || "",
        description: seoItem?.description || "",
        description_ru: seoItem?.description_ru || "",
        keywords: seoItem?.keywords || "",
        seoTitle: seoItem?.seoTitle || "",
        seoTitle_ru: seoItem?.seoTitle_ru || "",
        seoText: seoItem?.seoText || "",
        seoText_ru: seoItem?.seoText_ru || "",
        hideSeoText: seoItem?.hideSeoText || false,
    }

    const defaultValues = isUpdate ? seoValues : initValues

    const errorText = isUpdate
        ? "Помилка редагування Seo"
        : "Помилка створення Seo"

    const pageTitle = isUpdate
        ? `Редагування "${seoItem.page}"`
        : "Створення Seo"
    const successText = isUpdate ? "Seo відредаговано" : "Seo створено"
    const loadingText = isUpdate ? "Редагування Seo..." : "Створення Seo"
    const requestMethod = isUpdate ? "PUT" : "POST"

    const methods = useForm({
        defaultValues,
        resolver: zodResolver(seoValidation),
    })

    const submitHandler = async (data) => {
        const formData = {
            id: seoItem?.id,
            ...data,
        }
        try {
            await toast.promise(
                apiRequest("/api/seo", formData, requestMethod),
                {
                    loading: loadingText,
                    success: () => {
                        router.push("/seo")
                        return successText
                    },
                    error: (e) => e,
                }
            )
        } catch (e) {
            toast.error(errorText)
        }
    }

    const errors = methods.formState.errors
    console.log("ERRORS", errors)
    return (
        <div>
            <div className="flex justify-between items-center">
                <TitlePage title={pageTitle} />
                <Button onClick={methods.handleSubmit(submitHandler)}>
                    {isUpdate ? "Змінити" : "Створити"}
                </Button>
            </div>
            <div className={"flex flex-col gap-8"}>
                <Input
                    control={methods.control}
                    name={"page"}
                    label={"URL"}
                    disabled={
                        methods.watch("page")?.includes("/blog") ||
                        methods.watch("page")?.includes("/additional")
                    }
                />
                <Input
                    control={methods.control}
                    name={"title"}
                    label={"Title"}
                />
                <Input
                    control={methods.control}
                    name={"title_ru"}
                    label={"Title RU"}
                />
                <Input
                    control={methods.control}
                    name={"description"}
                    label={"Description"}
                    multiline={true}
                    rows={10}
                />
                <Input
                    control={methods.control}
                    name={"description_ru"}
                    label={"Description RU"}
                    multiline={true}
                    rows={10}
                />
                <Input
                    control={methods.control}
                    name={"keywords"}
                    label={"Keywords"}
                />

                <div className={"flex flex-col gap-8"}>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={methods.watch("hideSeoText")}
                                    onChange={(e, checked) =>
                                        methods.setValue("hideSeoText", checked)
                                    }
                                />
                            }
                            label={"Приховати SEO текст"}
                        />
                    </div>
                    {!methods.watch("hideSeoText") && (
                        <>
                            <div
                                className={
                                    "font-bold text-2xl text-gray-700 my-4"
                                }
                            >
                                Seo Text
                            </div>
                            <Input
                                control={methods.control}
                                name={"seoTitle"}
                                label={"SEO Heading"}
                                multiline={true}
                                rows={10}
                            />
                            <Input
                                control={methods.control}
                                name={"seoTitle_ru"}
                                label={"SEO Heading RU"}
                                multiline={true}
                                rows={10}
                            />
                            <div>
                                <div
                                    className={
                                        "font-bold text-xl text-gray-700 my-4"
                                    }
                                >
                                    Text
                                </div>
                                <div
                                    style={{
                                        maxWidth: 1326,
                                        overflowX: "hidden",
                                    }}
                                >
                                    <Editor
                                        apiKey={
                                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                                        }
                                        onInit={(editor) =>
                                            (editorRef.current = editor)
                                        }
                                        onBlur={(focused, editor) =>
                                            methods.setValue(
                                                "seoText",
                                                editor.getContent()
                                            )
                                        }
                                        initialValue={
                                            isUpdate
                                                ? seoItem?.seoText
                                                : "<p>Введіть текст...</p>"
                                        }
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
                                            menubar:
                                                "file edit view insert format tools table help",
                                            toolbar_mode: "sliding",
                                            contextmenu:
                                                "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
                                            visualblocks_default_state: true,
                                            fontsize_formats:
                                                "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
                                            textpattern_patterns: [
                                                {
                                                    start: "*",
                                                    end: "*",
                                                    format: "italic",
                                                },
                                                {
                                                    start: "**",
                                                    end: "**",
                                                    format: "bold",
                                                },
                                                { start: "#", format: "h1" },
                                                { start: "##", format: "h2" },
                                                { start: "###", format: "h3" },
                                                { start: "####", format: "h4" },
                                                {
                                                    start: "#####",
                                                    format: "h5",
                                                },
                                                {
                                                    start: "######",
                                                    format: "h6",
                                                },
                                                {
                                                    start: "1. ",
                                                    cmd: "InsertOrderedList",
                                                },
                                                {
                                                    start: "* ",
                                                    cmd: "InsertUnorderedList",
                                                },
                                                {
                                                    start: "- ",
                                                    cmd: "InsertUnorderedList",
                                                },
                                            ],
                                        }}
                                    />
                                    {methods.formState.errors?.["seoText"]
                                        ?.message && (
                                        <div className={"text-red-500"}>
                                            {
                                                methods.formState.errors?.[
                                                    "seoText"
                                                ]?.message
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div
                                    className={
                                        "font-bold text-xl text-gray-700 my-4"
                                    }
                                >
                                    Text RU
                                </div>
                                <div
                                    style={{
                                        maxWidth: 1326,
                                        overflowX: "hidden",
                                    }}
                                >
                                    <Editor
                                        apiKey={
                                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                                        }
                                        onInit={(editor) =>
                                            (ruEditorRef.current = editor)
                                        }
                                        onBlur={(focused, editor) =>
                                            methods.setValue(
                                                "seoText_ru",
                                                editor.getContent()
                                            )
                                        }
                                        initialValue={
                                            isUpdate
                                                ? seoItem?.seoText_ru
                                                : "<p>Введіть текст...</p>"
                                        }
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
                                            menubar:
                                                "file edit view insert format tools table help",
                                            toolbar_mode: "sliding",
                                            contextmenu:
                                                "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | forecolor backcolor | cut copy paste | selectall | link",
                                            visualblocks_default_state: true,
                                            fontsize_formats:
                                                "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 72px",
                                            textpattern_patterns: [
                                                {
                                                    start: "*",
                                                    end: "*",
                                                    format: "italic",
                                                },
                                                {
                                                    start: "**",
                                                    end: "**",
                                                    format: "bold",
                                                },
                                                { start: "#", format: "h1" },
                                                { start: "##", format: "h2" },
                                                { start: "###", format: "h3" },
                                                { start: "####", format: "h4" },
                                                {
                                                    start: "#####",
                                                    format: "h5",
                                                },
                                                {
                                                    start: "######",
                                                    format: "h6",
                                                },
                                                {
                                                    start: "1. ",
                                                    cmd: "InsertOrderedList",
                                                },
                                                {
                                                    start: "* ",
                                                    cmd: "InsertUnorderedList",
                                                },
                                                {
                                                    start: "- ",
                                                    cmd: "InsertUnorderedList",
                                                },
                                            ],
                                        }}
                                    />
                                    {methods.formState.errors?.["seoText_ru"]
                                        ?.message && (
                                        <div className={"text-red-500"}>
                                            {
                                                methods.formState.errors?.[
                                                    "seoText_ru"
                                                ]?.message
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SeoForm
