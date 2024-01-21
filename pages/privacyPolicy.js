"use client"

import { useState } from "react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import prisma from "@/prisma/client"

import Layout from "@/components/adminpanel/Layout"
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage"
import Button from "@mui/material/Button"
import Input from "@/components/UI/Input/Input"
import { Editor } from "@tinymce/tinymce-react"
import { apiRequest } from "@/utils/apiRequest"
import { toast } from "react-hot-toast"

const pageModes = {
    view: "view",
    edit: "edit",
}

export async function getServerSideProps() {
    const policy = await prisma.privacy.findMany({})

    return {
        props: {
            policy,
        },
    }
}

const PrivacyPolicy = ({ policy }) => {
    const [mode, setMode] = useState(pageModes.view)
    const editorRef = useRef(null)
    const ruEditorRef = useRef(null)

    console.log("BDDDDDDD=====", policy)
    const isUpdate = policy.length > 0
    console.log("UPDATE=======", isUpdate)

    const bdValues = {
        title: policy[0]?.title,
        title_ru: policy[0]?.title_ru,
        descr: policy[0]?.descr,
        descr_ru: policy[0]?.descr_ru,
    }

    const initialValues = {
        title: "",
        title_ru: "",
        descr: "",
        descr_ru: "",
    }

    const defaultValues = isUpdate ? bdValues : initialValues

    const form = useForm({
        mode: "onBlur",
        defaultValues,
    })
    const saveData = async (data) => {
        console.log(data)
        try {
            await toast.promise(
                apiRequest(
                    "/api/privacy",
                    {
                        id: isUpdate ? policy[0].id : null,
                        ...data,
                    },
                    isUpdate ? "PUT" : "POST"
                ),
                {
                    loading: isUpdate
                        ? "Оновлення політики конфіденційності..."
                        : "Створення політики конфіденційності...",
                    success: () => {
                        setMode(pageModes.view)
                        return isUpdate
                            ? "Політика конфіденційності оновлена"
                            : "Політика конфіденційності створена"
                    },
                    error: (e) => `Помилка ${e.message}`,
                }
            )
        } catch (e) {
            console.error(e)
        }
    }
    const handleCansel = () => {
        setMode(pageModes.view)
    }
    return (
        <Layout>
            <div className="flex justify-between items-center">
                <TitlePage
                    title={
                        mode === pageModes.view
                            ? "Політика конфіденційності"
                            : "Редагування політики конфіденційності"
                    }
                />
                <div className="flex gap-x-2">
                    {mode === pageModes.view ? (
                        <Button
                            variant={"contained"}
                            onClick={() => setMode(pageModes.edit)}
                        >
                            Редагувати
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant={"contained"}
                                onClick={form.handleSubmit(saveData)}
                            >
                                Зберегти
                            </Button>
                            <Button
                                variant={"contained"}
                                onClick={handleCansel}
                            >
                                Скасувати
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div
                className="flex flex-col gap-y-6"
                style={{
                    pointerEvents: mode === pageModes.view ? "none" : "all",
                }}
            >
                <div className="flex flex-col space-y-4">
                    <h1 className="text-xl">Загаловок сторінки</h1>
                    <Input
                        className={"w-1/2"}
                        label={"Заголовок"}
                        name={"title"}
                        control={form.control}
                        error={!!form.formState.errors?.title?.message}
                    />
                    <Input
                        className={"w-1/2"}
                        label={"Заголовок RU"}
                        name={"title_ru"}
                        control={form.control}
                        error={!!form.formState.errors?.title?.message}
                    />
                </div>
                <div>
                    <div className={"text-xl pb-2"}>Текст UA</div>
                    <Editor
                        apiKey={
                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                        }
                        onInit={(editor) => (editorRef.current = editor)}
                        onBlur={(focused, editor) =>
                            form.setValue(`descr`, editor.getContent())
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
                </div>
                <div>
                    <div className={"text-xl pb-2"}>Текст RU</div>
                    <Editor
                        apiKey={
                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                        }
                        onInit={(editor) => (ruEditorRef.current = editor)}
                        onBlur={(focused, editor) =>
                            form.setValue(`descr_ru`, editor.getContent())
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
                </div>
            </div>
        </Layout>
    )
}

export default PrivacyPolicy
