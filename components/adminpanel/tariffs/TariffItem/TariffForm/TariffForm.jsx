import { Button, Drawer } from "@mui/material"
import TextField from "@mui/material/TextField"
import { useState } from "react"
import TariffPlanForm, {
    initialTariffPlan,
} from "@/components/adminpanel/tariffs/TariffItem/TariffForm/TariffPlanForm"
import TariffPlanItem from "@/components/adminpanel/tariffs/TariffItem/TariffForm/TariffPlanItem"
import Cropper from "@/components/Cropper/Cropper"
import useLoading from "@/context/useLoading"
import { manageImages } from "@/components/adminpanel/tariffs/TariffItem/manageImages"
import { useRouter } from "next/navigation"

const TariffForm = ({ tariff, isVisible, setIsVisible, setTariffs }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: tariff.title,
        title_ru: tariff.title,
        subTitle: tariff.subTitle,
        subTitle_ru: tariff.subTitle_ru,
        price: tariff.price,
        text: tariff.text,
        text_ru: tariff.text_ru,
        alt: tariff?.image.alt,
        alt_ru: tariff?.image?.alt_ru,
    })
    const [file, setFile] = useState(null)
    const { setIsLoading } = useLoading()
    const [selectedTariffPlan, setSelectedTariffPlan] = useState(null)
    const [tariffPlanList, setTariffPlanList] = useState(
        tariff?.TariffPlan?.items || []
    )

    console.log(tariff, "tatatdfsafsad ")
    const handleClose = () => {
        setIsVisible(false)
        setFile(null)
    }

    const submitHandler = async () => {
        try {
            setIsLoading(true)
            const { tariffImage, newTariffPlans } = await manageImages(
                file,
                tariff,
                tariffPlanList,
                {
                    alt: formData?.alt,
                    alt_ru: formData?.alt_ru,
                }
            )
            const body = {
                ...formData,
                id: tariff.id,
                TariffPlan: newTariffPlans,
                image: tariffImage,
            }
            console.log("BODY ========= ", body)
            const res = await fetch("api/tariffs", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.message)
            console.log("SUCCESS", json.data)
            router.refresh()
            setTariffs((prev) => {
                return prev?.map((item) =>
                    item.id === tariff.id ? json.data : item
                )
            })
            handleClose()
        } catch (e) {
            setIsLoading(false)
            console.error(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(`${name} ========`, value)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    return (
        <Drawer
            open={isVisible}
            onClose={handleClose}
            anchor={"right"}
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
        >
            <div className="flex flex-col gap-8">
                <div className={"font-bold text-xl"}>
                    Редагування тарифу "{tariff.title}"
                </div>
                <div className="flex gap-3">
                    <TextField
                        className="flex-1"
                        size={"small"}
                        label="Назва"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        className="flex-1"
                        size={"small"}
                        label="Тип"
                        name="subTitle"
                        value={formData.subTitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-3">
                    <TextField
                        className="flex-1"
                        size={"small"}
                        label="Назва RU"
                        name="title_ru"
                        value={formData.title_ru}
                        onChange={handleChange}
                    />
                    <TextField
                        className="flex-1"
                        size={"small"}
                        label="Тип RU"
                        name="subTitle_ru"
                        value={formData.subTitle_ru}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-1">
                    <TextField
                        className="flex-1"
                        size={"small"}
                        label="Ціна за м2"
                        type={"number"}
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-1">
                    <TextField
                        className="w-full"
                        inputProps={{
                            style: { minHeight: 200 },
                        }}
                        size={"small"}
                        label="Опис"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        multiline
                    />
                </div>
                <div className="flex-1">
                    <TextField
                        className="w-full"
                        inputProps={{
                            style: { minHeight: 200 },
                        }}
                        size={"small"}
                        label="Опис RU"
                        name="text_ru"
                        value={formData.text_ru}
                        onChange={handleChange}
                        multiline
                    />
                </div>
                <div>
                    <div className="font-medium text-lg mb-4">
                        Зображення тарифу
                    </div>
                    <div className="flex">
                        <Cropper
                            aspect={16 / 9}
                            file={file}
                            setFile={setFile}
                            height={225}
                            width={400}
                            placeholder={tariff?.image?.url || undefined}
                        />
                    </div>
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
                </div>
                <div className="flex justify-between">
                    <div className="font-medium text-lg">Слайди тарифу</div>
                    <Button
                        onClick={() => setSelectedTariffPlan(initialTariffPlan)}
                        className="self-end"
                    >
                        Додати слайд
                    </Button>
                    <TariffPlanForm
                        tariffPlan={selectedTariffPlan}
                        setTariffPlan={setSelectedTariffPlan}
                        setTariffPlanList={setTariffPlanList}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    {tariffPlanList?.map((item) => (
                        <TariffPlanItem
                            tariffPlan={item}
                            setTariffPlanList={setTariffPlanList}
                            setSelectedTariffPlan={setSelectedTariffPlan}
                        />
                    ))}
                </div>
                <Button
                    onClick={submitHandler}
                    variant={"contained"}
                    className="self-end"
                >
                    Зберегти
                </Button>
            </div>
        </Drawer>
    )
}

export default TariffForm
