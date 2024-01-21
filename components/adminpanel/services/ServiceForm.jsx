import { useFieldArray, useForm } from "react-hook-form"
import Input from "@/components/UI/Input/Input"
import { Editor } from "@tinymce/tinymce-react"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { apiRequest } from "@/utils/apiRequest"
import Button from "@mui/material/Button"
import { useRouter } from "next/router"
import Cropper from "@/components/Cropper/Cropper"
import { manageServiceImages } from "@/components/adminpanel/services/manageImage"
import ContentBlock from "@/components/adminpanel/ContentBlock/ContentBlock"

const ServiceForm = ({ service }) => {
    const router = useRouter()
    const isUpdate = !!service?.id

    const serviceValues = {
        title: service?.title,
        title_ru: service?.title_ru,
        descr: service?.descr,
        descr_ru: service?.descr_ru,
        image: service?.image,
        alt: service?.image?.alt,
        alt_ru: service?.image?.alt_ru,
        price: service?.price,
        label: service?.label,
        order: "",
        content: service?.content || { items: [] },
    }

    const initialValues = {
        title: "",
        title_ru: "",
        descr: "",
        descr_ru: "",
        order: "",
        price: "",
        label: "",
        image: null,
        alt: "",
        alt_ru: "",
        content: { items: [] },
    }

    const editorRef = useRef(null)
    const ruEditorRef = useRef(null)

    const defaultValues = isUpdate ? serviceValues : initialValues

    const methods = useForm({
        defaultValues,
    })

    const {
        fields: blocks,
        append,
        remove,
    } = useFieldArray({
        name: "content.items",
        control: methods.control,
    })

    console.log(methods.watch())

    useEffect(() => {
        methods.reset(defaultValues)
    }, [service])

    const submitHandler = async (data) => {
        try {
            const request = async () => {
                const [contentWithImages, mainImage] =
                    await manageServiceImages(
                        data?.content?.items || [],
                        service?.content?.items || [],
                        data?.image,
                        service?.image,
                        {
                            alt: data.alt,
                            alt_ru: data.alt_ru,
                        }
                    )

                const formData = {
                    ...data,
                    id: service?.id,
                    content: { items: contentWithImages },
                    image: mainImage,
                }
                return await apiRequest(
                    "/api/services",
                    formData,
                    isUpdate ? "PUT" : "POST"
                )
            }

            await toast.promise(request(), {
                loading: isUpdate
                    ? "Оновлення послуги..."
                    : "Створення послуги...",
                success: () => {
                    router.push("/services")
                    return isUpdate ? "Послуга оновлена" : "Послуга створена"
                },
                error: "Помилка",
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteHandler = async () => {
        const request = async () => {
            try {
                await manageServiceImages(
                    [],
                    service?.content?.items || [],
                    undefined,
                    methods.watch("image") || undefined
                )

                await apiRequest(
                    `/api/services?id=${service?.id}`,
                    undefined,
                    "DELETE"
                )
            } catch (e) {
                throw e
            }
        }

        try {
            await toast.promise(request(), {
                loading: "Видалення послуги...",
                success: () => {
                    router.push("/services")
                    return "Послуга видалена"
                },
                error: "Помилка",
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <div className={"space-y-6"}>
                <div className={"text-2xl"}>
                    {isUpdate
                        ? `Редагувати послугу "${service.title}"`
                        : "Створити послугу"}
                </div>
                <div className={"grid grid-cols-2 gap-20"}>
                    <Input
                        name={"title"}
                        control={methods.control}
                        error={methods.formState.errors?.["title"]?.message}
                        label={"Послуга"}
                    />
                    <Input
                        name={"title_ru"}
                        control={methods.control}
                        error={methods.formState.errors?.["title_ru"]?.message}
                        label={"Послуга RU"}
                    />
                </div>

                <div className={"flex gap-5"}>
                    <Input
                        type={"number"}
                        className={"w-1/10"}
                        name={"order"}
                        control={methods.control}
                        error={methods.formState.errors?.["order"]?.message}
                        label={"Порядок"}
                    />
                    <div className={"flex gap-5 w-full"}>
                        <Input
                            type={"number"}
                            className={"w-1/10"}
                            name={"price"}
                            control={methods.control}
                            error={methods.formState.errors?.["price"]?.message}
                            label={"Ціна"}
                        />
                        <Input
                            className={"w-1/10"}
                            name={"label"}
                            control={methods.control}
                            error={methods.formState.errors?.["label"]?.message}
                            label={"Напис"}
                        />
                    </div>
                </div>
                <div className={"grid grid-cols-1 gap-2 2xl:grid-cols-2 "}>
                    <div className={"flex flex-col gap-5"}>
                        <h2 className={"text-3xl"}>Фото</h2>
                        <Cropper
                            file={
                                methods.watch("image")?.url ===
                                service?.image?.url
                                    ? null
                                    : methods.watch("image")
                            }
                            setFile={(image) =>
                                methods.setValue(`image`, image)
                            }
                            placeholder={service?.image?.url || undefined}
                            height={495}
                            aspect={685 / 495}
                            width={685}
                        />
                        <Input
                            className={"w-1/2"}
                            name={"alt"}
                            control={methods.control}
                            error={methods.formState.errors?.["alt"]?.message}
                            label={"Alt"}
                        />
                        <Input
                            className={"w-1/2"}
                            name={"alt_ru"}
                            control={methods.control}
                            error={
                                methods.formState.errors?.["alt_ru"]?.message
                            }
                            label={"Alt RU"}
                        />
                    </div>
                    <div className={"flex flex-col gap-5"}>
                        <div className={"flex flex-col gap-5"}>
                            <h2 className={"text-3xl"}>Опис</h2>
                            <Editor
                                apiKey={
                                    "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                                }
                                onInit={(editor) =>
                                    (editorRef.current = editor)
                                }
                                onBlur={(focused, editor) =>
                                    methods.setValue(
                                        `descr`,
                                        editor.getContent()
                                    )
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
                                        { start: "#####", format: "h5" },
                                        { start: "######", format: "h6" },
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
                        </div>
                        <div className={"flex flex-col gap-5"}>
                            <h2 className={"text-3xl"}>Опис RU</h2>
                            <Editor
                                apiKey={
                                    "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                                }
                                onInit={(editor) =>
                                    (ruEditorRef.current = editor)
                                }
                                onBlur={(focused, editor) =>
                                    methods.setValue(
                                        `descr_ru`,
                                        editor.getContent()
                                    )
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
                                        { start: "#####", format: "h5" },
                                        { start: "######", format: "h6" },
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
                        </div>
                    </div>
                </div>

                <h2 className={"text-3xl"}>Блоки сторінки:</h2>
                {blocks?.map((block, index) => (
                    // <ServiceBlock
                    //     key={index}
                    //     number={index + 1}
                    //     isUpdate={isUpdate}
                    //     remove={() => remove(index)}
                    //     setValue={methods.setValue}
                    //     name={`content.items.${index}`}
                    //     watch={methods.watch}
                    //     control={methods.control}
                    // />

                    <ContentBlock
                        key={index}
                        number={index + 1}
                        isUpdate={isUpdate}
                        remove={() => remove(index)}
                        setValue={methods.setValue}
                        name={`content.items.${index}`}
                        watch={methods.watch}
                        control={methods.control}
                    />
                ))}
                <div className={"flex w-full gap-12 justify-center"}>
                    <Button onClick={() => append({ image: null })}>
                        Додати фото
                    </Button>
                    <Button onClick={() => append({ text: "", text_ru: "" })}>
                        Додати текст
                    </Button>
                </div>
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
        </div>
    )
}

export default ServiceForm
