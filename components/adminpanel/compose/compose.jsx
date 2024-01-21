import { Backdrop, Button, Checkbox, CircularProgress } from "@mui/material"
import React, { useState } from "react"
import TitlePage from "../UI/titlePage/titlePage"
import ComposeDrawer from "./composeDrawer"
import { toast } from "react-hot-toast"

const Compose = ({ data: initialData, tariffs }) => {
    const [selectedCompose, setSelectedCompose] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(initialData || [])

    const handleSaveCompose = (item) => {
        setData((prevData) => {
            const index = prevData.findIndex(
                (prevItem) => prevItem.id === item.id
            )
            if (index === -1) {
                return [...prevData, item]
            }
            return [
                ...prevData.slice(0, index),
                item,
                ...prevData.slice(index + 1),
            ]
        })
        setSelectedCompose(null)
    }

    const handleRowClick = (item) => {
        setSelectedCompose(item)
    }

    const handleAddCompose = () => {
        const newItem = {
            id: Date.now(),
            text: "",
            text_ru: "",
            isCheckedFirst: false,
            isCheckedSecond: false,
            isCheckedThird: false,
        }
        setSelectedCompose(newItem)
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            console.log("BODY", { table: { rows: data } })
            const res = await fetch("/api/updateTariffComparison", {
                method: "PUT",
                body: JSON.stringify({ rows: data }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.message)
            setIsLoading(false)
            setData(json?.data?.table?.rows)
            toast.success("Зміни збережені")
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCheckboxChange = (item, name) => {
        setData((prevData) => {
            const index = prevData.findIndex(
                (prevItem) => prevItem.id === item.id
            )
            if (index === -1) {
                return prevData
            }
            return [
                ...prevData.slice(0, index),
                { ...prevData[index], [name]: !prevData[index][name] },
                ...prevData.slice(index + 1),
            ]
        })
    }

    const handleSaveNewCompose = (newItem) => {
        setData([...data, newItem])
        setSelectedCompose(null)
    }
    const handleDeleteCompose = (item) => {
        setData((prevData) =>
            prevData?.filter((prevItem) => prevItem.id !== item.id)
        )
        setSelectedCompose(null)
    }

    return (
        <section className="compose">
            <div className="container">
                <div className="compose__wrapper">
                    <TitlePage title="Порiвняння тарифiв" />
                    <div className="compose__top mt-10">
                        <div className="compose__top-title">
                            Назва тарифу/ послуги
                        </div>
                        {tariffs?.map((tariff) => (
                            <div className="compose__top-title">
                                {tariff.title}
                            </div>
                        ))}
                    </div>

                    <div className="compose__items mb-10">
                        {data?.map((item) => (
                            <div
                                className="compose__item hover:bg-stone-100 cursor-pointer"
                                key={item.id}
                                onClick={(event) => handleRowClick(item)}
                            >
                                <div className="compose__content-text">
                                    {item.text}
                                </div>
                                <div className="compose__content-check">
                                    <Checkbox
                                        value={item.isCheckedFirst}
                                        onChange={() =>
                                            handleCheckboxChange(
                                                item,
                                                "isCheckedFirst"
                                            )
                                        }
                                        checked={item.isCheckedFirst}
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    />
                                </div>
                                <div className="compose__content-check">
                                    <Checkbox
                                        value={item.isCheckedSecond}
                                        checked={item.isCheckedSecond}
                                        onChange={() =>
                                            handleCheckboxChange(
                                                item,
                                                "isCheckedSecond"
                                            )
                                        }
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    />
                                </div>
                                <div className="compose__content-check">
                                    <Checkbox
                                        value={item.isCheckedThird}
                                        checked={item.isCheckedThird}
                                        onChange={() =>
                                            handleCheckboxChange(
                                                item,
                                                "isCheckedThird"
                                            )
                                        }
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {selectedCompose && (
                        <ComposeDrawer
                            isOpen={!!selectedCompose}
                            onClose={() => setSelectedCompose(null)}
                            selectedCompose={selectedCompose}
                            onSave={handleSaveCompose}
                            onSaveNewCompose={handleSaveNewCompose}
                            onDelete={handleDeleteCompose}
                        />
                    )}

                    <div className="flex justify-between">
                        <Button variant="contained" onClick={handleAddCompose}>
                            додати
                        </Button>
                        <Button onClick={handleSubmit} variant="contained">
                            зберегти
                        </Button>
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1000000,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    )
}

export default Compose
