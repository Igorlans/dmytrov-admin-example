import React, { useRef } from "react"
import { IconButton } from "@mui/material"
import { BiTrash } from "react-icons/bi"
import Cropper from "@/components/Cropper/Cropper"
import { Editor } from "@tinymce/tinymce-react"
import Input from "@/components/UI/Input/Input"

const ServiceBlock = ({
    name,
    setValue,
    watch,
    isUpdate,
    number,
    remove,
    control,
}) => {
    const block = watch(name)
    const editorRef = useRef(null)
    const ruEditorRef = useRef(null)

    return (
        <div>
            <div className={"flex gap-4 justify-between"}>
                <h3 className={"text-2xl mb-4"}>Блок {number}: </h3>
                <IconButton onClick={remove}>
                    <BiTrash size={28} />
                </IconButton>
            </div>
            <div className={"max-w-[800px] mb-8"}>
                <div className={"font-bold text-xl text-gray-700 mb-4"}>
                    Фото
                </div>
                <Cropper
                    width={650}
                    height={450}
                    file={block.image?.url ? null : block?.image}
                    setFile={(image) => setValue(`${name}.image`, image)}
                    aspect={13 / 9}
                    placeholder={block?.image?.url || undefined}
                />
            </div>
            <div className={"my-4"}>
                <Input
                    className={"w-1/2"}
                    name={`${name}.image.alt`}
                    control={control}
                    label={"Alt"}
                />
            </div>
            <div className={"my-4"}>
                <Input
                    className={"w-1/2"}
                    name={`${name}.image.alt_ru`}
                    control={control}
                    label={"Alt RU"}
                />
            </div>
            <div>
                <div className={"font-bold text-xl text-gray-700 mb-4"}>
                    Текст
                </div>
                <div style={{ maxWidth: 1326, overflowX: "hidden" }}>
                    <Editor
                        apiKey={
                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                        }
                        onInit={(editor) => (editorRef.current = editor)}
                        onBlur={(focused, editor) =>
                            setValue(`${name}.text`, editor.getContent())
                        }
                        initialValue={
                            isUpdate ? block?.text : "<p>Введіть текст...</p>"
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
                <div className={"font-bold text-xl text-gray-700 my-4"}>
                    Текст RU
                </div>
                <div style={{ maxWidth: 1326, overflowX: "hidden" }}>
                    <Editor
                        apiKey={
                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                        }
                        onInit={(editor) => (ruEditorRef.current = editor)}
                        onBlur={(focused, editor) =>
                            setValue(`${name}.text_ru`, editor.getContent())
                        }
                        initialValue={
                            isUpdate
                                ? block?.text_ru
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
        </div>
    )
}

export default ServiceBlock
