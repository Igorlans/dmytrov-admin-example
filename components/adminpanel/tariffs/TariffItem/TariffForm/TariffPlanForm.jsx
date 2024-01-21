import Drawer from "@mui/material/Drawer"
import { useEffect, useState, useRef } from "react"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import Cropper from "@/components/Cropper/Cropper"
import { Editor } from "@tinymce/tinymce-react"

export const initialTariffPlan = {
    title: "",
    title_ru: "",
    description: "",
    description_ru: "",
    image: {
        name: "",
        url: "",
    },
}

const TariffPlanForm = ({ tariffPlan, setTariffPlan, setTariffPlanList }) => {
    const [formData, setFormData] = useState({
        title: tariffPlan?.title,
        title_ru: tariffPlan?.title_ru,
        description: tariffPlan?.description,
        description_ru: tariffPlan?.description_ru,
        image: tariffPlan?.image,
        alt: tariffPlan?.image.alt,
        alt_ru: tariffPlan?.image?.alt_ru,
    })
    const editorRef = useRef(null)
    const ruEditorRef = useRef(null)
    
    const [file, setFile] = useState(null)

    const handleFile = (newFile) => {
        const formDataFile = {
            name: newFile?.name,
            url: newFile,
        }
        setFile(newFile)
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: formDataFile,
        }))
    }

    const resetForm = () => {
        setFormData(initialTariffPlan)
        setFile(null)
    }
    const handleClose = () => {
        setTariffPlan(null)
        resetForm()
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        if (!tariffPlan.id) {
            const newTariffPlan = {
                ...formData,
                image: {
                    ...formData.image,
                    alt: formData.alt,
                    alt_ru: formData.alt_ru,
                },
                id: Date.now(),
            }
            setTariffPlanList((prev) => [...prev, newTariffPlan])
            handleClose()
        } else {
            setTariffPlanList((prev) =>
                prev?.map((item) =>
                    item.id === tariffPlan.id
                        ? {
                              ...formData,
                              image: {
                                  ...formData.image,
                                  alt: formData.alt,
                                  alt_ru: formData.alt_ru,
                              },
                              id: tariffPlan.id,
                          }
                        : item
                )
            )
            handleClose()
        }
    }

    useEffect(() => {
        if (tariffPlan?.id) {
            setFormData(tariffPlan)
            // if (tariffPlan?.image?.url) {
            // 	setFile(tariffPlan?.image?.url)
            // }
        } else {
            resetForm()
        }
    }, [tariffPlan])

    return (
        <Drawer
            open={!!tariffPlan}
            onClose={handleClose}
            anchor={"right"}
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
        >
            <div className="flex flex-col gap-8">
                <div className={"font-bold text-xl"}>
                    {tariffPlan?.title
                        ? "Редагування слайду " + tariffPlan?.title
                        : "Створення слайду"}
                </div>
                <TextField
                    className="w-full"
                    size={"small"}
                    label="Назва"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    className="w-full"
                    size={"small"}
                    label="Назва RU"
                    name="title_ru"
                    value={formData.title_ru}
                    onChange={handleChange}
                />

                <div className="flex flex-col gap-y-2">
                    Опис
                    <Editor
                        apiKey={
                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                        }
                        onInit={(editor) => (editorRef.current = editor)}
                        onBlur={(focused, editor) =>
                            setFormData(state => ({
                                ...state,
                                description: editor.getContent()
                            }))
                            // form.setValue(`description`, editor.getContent())
                        }
                        initialValue={formData?.description}
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

                <div className="flex flex-col gap-y-2">
                    Опис RU
                    <Editor
                        apiKey={
                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                        }
                        onInit={(editor) => (ruEditorRef.current = editor)}
                        onBlur={(focused, editor) =>
                            setFormData(state => ({
                                ...state,
                                description_ru: editor.getContent()
                            }))
                        }
                        initialValue={formData?.description_ru}
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

                <Cropper
                    file={file}
                    setFile={handleFile}
                    height={495}
                    aspect={1587 / 1122}
                    width={685}
                    placeholder={
                        tariffPlan?.image?.url &&
                        typeof tariffPlan?.image?.url === "object"
                            ? URL.createObjectURL(tariffPlan?.image?.url)
                            : tariffPlan?.image?.url || undefined
                    }
                />
                <div className={"my-5"}>
                    <TextField
                        className="flex-1 w-full"
                        size={"small"}
                        label="Alt"
                        name="alt"
                        value={formData.alt}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        className="flex-1 w-full"
                        size={"small"}
                        label="Alt RU"
                        name="alt_ru"
                        value={formData.alt_ru}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    variant={"contained"}
                    className="self-end"
                >
                    Зберегти
                </Button>
            </div>
        </Drawer>
    )
}

export default TariffPlanForm
