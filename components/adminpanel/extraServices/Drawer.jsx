import * as React from "react"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Backdrop, CircularProgress } from "@mui/material"
import { STORAGE_URL } from "@/config"
import SupabaseFileService from "@/components/Services/SupabaseFileService"
import { v4 as uuidv4 } from "uuid"
import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"

export default function ServicesDrawer({ item, idx, storage, setStorage }) {
    const [titlee, setTitlee] = React.useState(item?.title)
    const [descr, setDescr] = React.useState(item?.descr)
    const [pric, setPric] = React.useState(item?.price)
    const [isShow, setIsShow] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [newOrder, setNewOrder] = React.useState(item?.order)

    const [selectedFile, setSelectedFile] = React.useState(null)

    const editorRef = useRef(null)

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const updateHandler = async () => {
        try {
            let image
            setIsLoading(true)
            if (selectedFile) {
                // const deletedFile = await SupabaseFileService.removeFile('images', item.image.name);
                const fileExtension = selectedFile.name.split(".").pop()
                const fileName = `${uuidv4()}.${fileExtension}`
                const uploadedFile = await SupabaseFileService.uploadFile(
                    selectedFile,
                    "images",
                    fileName,
                    "servicesImages"
                )
                image = {
                    name: uploadedFile.path,
                    url: STORAGE_URL + "/" + uploadedFile.path,
                }
            }
            const response = await fetch(`/api/services`, {
                method: "PUT",
                body: JSON.stringify({
                    id: item.id,
                    title: titlee,
                    descr: descr,
                    price: pric,
                    order: newOrder,
                    image: image || item.image,
                }),
            })
            const json = await response.json()
            const newStorage = storage.map((itemm) =>
                itemm.id === item.id ? json.data : itemm
            )
            setStorage(newStorage)
            setIsShow(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteHandler = async (id) => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/services?id=${id}`, {
                method: "DELETE",
            })
            const deletedFile = await SupabaseFileService.removeFile(
                "images",
                item.image.name
            )
            console.log(`Question with id ${id} deleted`)
            const newStorage = storage.filter((service) => service.id !== id)
            setStorage(newStorage)
            setIsLoading(false)
            setIsShow(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="btns_questions">
                <Button
                    className="services__btn-drawer"
                    onClick={() => setIsShow(true)}
                >
                    Редагувати
                </Button>
                <FontAwesomeIcon
                    className="trash_btn_serv"
                    onClick={() => deleteHandler(item.id)}
                    icon={faTrash}
                />
            </div>
            <Drawer
                PaperProps={{
                    style: { padding: 30, minWidth: "70vw" },
                }}
                anchor={"right"}
                open={isShow}
                onClose={() => setIsShow(false)}
            >
                <div className="p-8">
                    <div className="mb-5">Редагувати дод.послугу</div>
                    <TextField
                        value={titlee}
                        onChange={(e) => setTitlee(e.target.value)}
                        id="outlined-basic"
                        fullWidth
                        label="Назва"
                        variant="outlined"
                        multiline
                        rows={3}
                        className="mb-5"
                    />
                    <Editor
                        apiKey={
                            "q8f2fmzxqfz98mfytq1wweqdenzdyunekdrjujyc2bwejcf6"
                        }
                        onInit={(editor) => (editorRef.current = editor)}
                        onBlur={(focused, editor) =>
                            setDescr(editor.getContent())
                        }
                        initialValue={descr}
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
                    <TextField
                        value={pric}
                        onChange={(e) => setPric(e.target.value)}
                        id="outlined-basic"
                        fullWidth
                        label="Ціна"
                        variant="outlined"
                        multiline
                        rows={1}
                        className="mb-5"
                    />
                    <TextField
                        value={newOrder}
                        onChange={(e) => setNewOrder(e.target.value)}
                        id="outlined-basic"
                        fullWidth
                        label="Порядок"
                        variant="outlined"
                        multiline
                        rows={1}
                        className="mb-5"
                    />
                    <Button
                        variant="contained"
                        component="label"
                        className="w-content"
                    >
                        Завантажити фото
                        <input type="file" hidden onChange={handleFileSelect} />
                    </Button>
                    {selectedFile && (
                        <div style={{ width: "200px" }}>
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected File"
                                style={{
                                    maxWidth: "100%",
                                    marginTop: "10px",
                                }}
                            />
                        </div>
                    )}
                    <div className="mt-8">
                        <Button onClick={updateHandler} variant="outlined">
                            Зберегти
                        </Button>
                    </div>
                </div>
            </Drawer>

            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1000000,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
