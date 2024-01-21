import { useState } from "react"
import {
    Backdrop,
    Button,
    CircularProgress,
    Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material"
import dayjs from "dayjs"
import { FiDownload } from "react-icons/fi"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers"

const translateType = {
    APARTMENT: "КВАРТИРА",
    HOUSE: "ПРИВАТНИЙ БУДИНОК",
    COMMERCE: "КОМЕРЦІЙНЕ ПРИМІЩЕННЯ",
}

const ProposalDrawer = ({
    proposal,
    isOpen,
    onClose,
    setProposals,
    propsals,
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(dayjs(Number(proposal?.date)) || null)
    const [currentStatus, setCurrentStatus] = useState(proposal?.status)
    const [adminComment, setAdminComment] = useState(
        proposal?.adminComment || ""
    )

    const handleStatusChange = (event) => {
        const newStatus = event.target.value
        setCurrentStatus(newStatus)
    }

    const handleSubmit = async () => {
        try {
            if (proposal.status) {
                setIsLoading(true)
                const res = await fetch("/api/updateRequestStatus", {
                    method: "PUT",
                    body: JSON.stringify({
                        status: currentStatus,
                        adminComment,
                        date: String(dayjs(date).valueOf()),
                        id: proposal.id,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const json = await res.json()
                if (!res.ok) throw new Error(json.message)
                const newProposals = propsals.map((propos) =>
                    propos.id === proposal.id ? json.data : propos
                )
                setProposals(newProposals)
                setIsLoading(false)
                onClose()
            }
        } catch (e) {
            setIsLoading(false)
            console.log(e)
            console.error(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Drawer
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ padding: "0px 30px", width: "800px" }}>
                    <div className="flex justify-between items-center my-5 mb-10">
                        <div>
                            ID:{" "}
                            <span className="font-normal">{proposal.id}</span>
                        </div>
                        {proposal?.status ? (
                            <div className="flex items-center">
                                <FormControl
                                    sx={{ m: 1, minWidth: 150 }}
                                    size="small"
                                >
                                    <InputLabel>Статус</InputLabel>
                                    <Select
                                        value={currentStatus}
                                        label="Статус"
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value={"NEW"}>
                                            Нова заявка
                                        </MenuItem>
                                        <MenuItem value={"PAUSED"}>
                                            Виконання призупинено
                                        </MenuItem>
                                        <MenuItem value={"IN_ORDER"}>
                                            В черзі на виконання
                                        </MenuItem>
                                        <MenuItem value={"REJECTED"}>
                                            Анульовано
                                        </MenuItem>
                                        <MenuItem value={"DONE"}>
                                            Виконано
                                        </MenuItem>
                                        <MenuItem value={"AWAIT_MEASURE"}>
                                            В очікуванні замірів
                                        </MenuItem>
                                        <MenuItem value={"IN_WORK"}>
                                            В роботі
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        ) : null}
                    </div>
                    <div className="full-width mb-10">
                        <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                            <div>Клієнт:</div>
                            <div>{`${proposal?.User?.surname || ""} ${
                                proposal?.User?.name || ""
                            } ${proposal?.User?.fatherName || ""}`}</div>
                        </div>
                        <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                            <div>Пароль:</div>
                            <div>{proposal?.User?.password}</div>
                        </div>
                        <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                            <div>Дата створення:</div>
                            <div>
                                {dayjs(proposal.createdAt).format("DD.MM.YYYY")}
                            </div>
                        </div>
                        {proposal.date ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Дата замірів:</div>
                                <DatePicker
                                    label="Дата замірів"
                                    value={date}
                                    format="DD/MM/YYYY"
                                    onChange={(newValue) => setDate(newValue)}
                                />
                            </div>
                        ) : null}
                        {proposal?.files?.url ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Файли замірів:</div>
                                <a
                                    href={proposal?.files?.url}
                                    download={proposal?.files?.url}
                                >
                                    Завантажити
                                </a>
                            </div>
                        ) : null}
                        <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                            <div>Телефон:</div>
                            <div>{proposal.User.phone}</div>
                        </div>
                        <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                            <div>Email:</div>
                            <div>{proposal.User.email}</div>
                        </div>
                        {proposal.address ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Адреса:</div>
                                <div>
                                    {`${proposal.address}, ${proposal.street}, ${proposal.homeNumber}`}
                                </div>
                            </div>
                        ) : null}
                        {proposal.type ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Тип:</div>
                                <div>{translateType[proposal.type]}</div>
                            </div>
                        ) : null}
                        {proposal.Tariffes ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Тариф:</div>
                                <div>{proposal.Tariffes.title}</div>
                            </div>
                        ) : null}
                        {proposal.square ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Квадратура:</div>
                                <div>{proposal.square} м2</div>
                            </div>
                        ) : null}
                        {proposal.comment ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Коментар:</div>
                                <div>{proposal.comment}</div>
                            </div>
                        ) : null}
                        <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                            <div>Коментар адміна:</div>
                            <TextField
                                label={"Коментар"}
                                sx={{ width: 500 }}
                                multiline={true}
                                rows={10}
                                value={adminComment}
                                onChange={(event) =>
                                    setAdminComment(event.target.value)
                                }
                            />
                        </div>
                        {proposal.Services ? (
                            <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                                <div>Дод.послуга:</div>
                                <div>{proposal.Services?.title}</div>
                            </div>
                        ) : null}
                    </div>
                    <div className="full-width flex justify-between items-center">
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                        >
                            Зберегти
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<FiDownload />}
                        >
                            Завантажити .pdf
                        </Button>
                    </div>
                </div>
            </LocalizationProvider>

            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1000000,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Drawer>
    )
}

export default ProposalDrawer
//   const handleUpdate = async (data) => {
//     try {
//       setIsLoading(true)
//       const response = await fetch(`${API_URL}api/admin`, {
//         method: 'POST',
//         body: JSON.stringify({ id: id, surname: surname, name: name, father_name: father_name, phone: phone, email: email, skype: skype, password: password }),
//       })
//       const updatedUser = {
//         ...user,
//         name,
//         surname,
//         status
//       }
//       console.log('save', updatedUser)
//       const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
//       setUsers(updatedUsers);
//       onClose();
//       setIsLoading(false)
//     } catch(e) {
//       setIsLoading(false)
//     } finally {
//       setIsLoading(false)
//     }
//   }
