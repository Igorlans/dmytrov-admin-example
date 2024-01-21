import Input from "@/components/UI/Input/Input"
import { Editor } from "@tinymce/tinymce-react"

import { useRef } from "react"

const PrivacyPolicyForm = ({ form }) => {
    const editorRef = useRef(null)
    const ruEditorRef = useRef(null)
    console.log(form.control.defaultValues)
    return (
        <div className="flex flex-col gap-y-6">
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
                <Editor
                    apiKey={"q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"}
                    onInit={(editor) => (editorRef.current = editor)}
                    onBlur={(focused, editor) =>
                        form.setValue(`descr`, editor.getContent())
                    }
                    initialValue={form.defaultValues?.descr}
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
    )
}

export default PrivacyPolicyForm
