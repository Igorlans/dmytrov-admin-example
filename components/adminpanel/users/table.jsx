import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material"
import { useState } from "react"
import InputMask from "react-input-mask"

const { default: UserDrawer } = require("./userDrawer")

const TableComponent = ({ data }) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [nameSearchQuery, setNameSearchQuery] = useState("")
    const [phoneSearchQuery, setPhoneSearchQuery] = useState("")
    const [emailSearchQuery, setEmailSearchQuery] = useState("")
    const [users, setUsers] = useState(data)
    const handleRowClick = (user) => {
        setSelectedUser(user)
    }
    // const handleSave = (updatedUser) => {
    //     const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    //     setUsers(updatedUsers);
    //     onClose();
    //   };

    const handleCloseDrawer = () => {
        setSelectedUser(null)
    }

    const handleNameSearchQueryChange = (event) => {
        setNameSearchQuery(event.target.value)
    }

    const handlePhoneSearchQueryChange = (event) => {
        setPhoneSearchQuery(event.target.value)
    }

    const handleEmailSearchQueryChange = (event) => {
        setEmailSearchQuery(event.target.value)
    }

    const filteredData = users.filter(
        (item) =>
            `${item?.surname || ""} ${item?.name || ""} ${
                item?.fatherName || ""
            }`
                ?.toLowerCase()
                .includes(nameSearchQuery.toLowerCase()) &&
            item?.phone
                .replace(/\D/g, "")
                ?.toLowerCase()
                .includes(
                    phoneSearchQuery?.replace(/\D/g, "")?.toLowerCase()
                ) &&
            item?.email?.toLowerCase().includes(emailSearchQuery.toLowerCase())
    )

    return (
        <div>
            <div className="grid grid-cols-3 gap-3 w-full mb-4 p-10 bg-white rounded-lg shadow shadow-lg">
                <TextField
                    id="name"
                    label="Ім'я"
                    variant="outlined"
                    size="small"
                    className="col-span-1"
                    onChange={handleNameSearchQueryChange}
                    value={nameSearchQuery}
                />

                <InputMask
                    mask="+38 (099) 999-99-99"
                    maskChar="_"
                    type="text"
                    id="form-phone"
                    onChange={handlePhoneSearchQueryChange}
                    value={phoneSearchQuery}
                    placeholder="Моб. номер телефону"
                >
                    {(inputProps) => (
                        <TextField
                            {...inputProps}
                            id="phone"
                            label="Номер"
                            variant="outlined"
                            size="small"
                            className="col-span-1"
                        />
                    )}
                </InputMask>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="col-span-1"
                    onChange={handleEmailSearchQueryChange}
                    value={emailSearchQuery}
                />
            </div>
            <TableContainer className="bg-white rounded-lg shadow shadow-lg">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-bold">Ім'я</TableCell>
                            <TableCell className="font-bold">
                                Номер тел.
                            </TableCell>
                            <TableCell className="font-bold">Email</TableCell>
                            <TableCell className="font-bold">Skype</TableCell>
                            {/*<TableCell className="font-bold">Статус</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow
                                key={item.id}
                                onClick={() => handleRowClick(item)}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <TableCell>{`${item?.surname || ""} ${
                                    item?.name || ""
                                } ${item?.fatherName || ""}`}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.skype}</TableCell>
                                {/* <TableCell>{item.}Статус</TableCell> */}
                                {/*<TableCell>*/}
                                {/*  <div className={`p2 rounded-md w-24 text-center text-white ${item.status ? 'bg-lime-500' : 'bg-red-500'}`}>*/}
                                {/*    {item.status ? 'Активний' : 'Неактивний'}*/}
                                {/*  </div>*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedUser && (
                <UserDrawer
                    users={users}
                    setUsers={setUsers}
                    user={selectedUser}
                    isOpen={true}
                    onClose={handleCloseDrawer}
                />
            )}
        </div>
    )
}

export default TableComponent
