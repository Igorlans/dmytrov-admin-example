import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import ProposalsCalendar from "./calendar/proposalsCalendar";
import React from "react";
import dayjs from "dayjs";
import ProposalDrawer from "./proposalDrawer";
import StatusBadge from "@/components/adminpanel/proposals/StatusBadge";
import { useRouter } from "next/navigation";
// {
//   id: 1,
//   client: 'Ivanov',
//   dateCreate: 1679098255756,
//   datePlan: 1680905714465,
//   phone: '123-45-67',
//   email: 'ivanov@example.com',
//   address: 'Main Street 1',
//   tariff: 'Basic',
//   status: 1,
// },

const TableProposalsProject = ({ data }) => {
    const [selectedDate, setSelectedDate] = useState([]);
    const [surnameSearchQuery, setSurnameSearchQuery] = useState("");
    const [phoneSearchQuery, setPhoneSearchQuery] = useState("");
    const [emailSearchQuery, setEmailSearchQuery] = useState("");
    const [adressSearchQuery, setAdressSearchQuery] = useState("");
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [idSearchQuery, setIdSearchQuery] = useState("");
    const [proposal, setProposal] = useState(data);

    const router = useRouter();
    // console.log(proposal);
    // Пошук
    // ====================
    const handleSurnameSearchQueryChange = (event) => {
        setSurnameSearchQuery(event.target.value);
    };
    const handlePhoneSearchQueryChange = (event) => {
        setPhoneSearchQuery(event.target.value);
    };
    const handleEmailSearchQueryChange = (event) => {
        setEmailSearchQuery(event.target.value);
    };
    const handleAdressSearchQueryChange = (event) => {
        setAdressSearchQuery(event.target.value);
    };

    const handleRowClick = (item) => {
        setSelectedProposal(item);
    };

    const handleCloseDrawer = () => {
        setSelectedProposal(null);
    };

    console.log(selectedDate);
    const filteredData = useMemo(() => {
        return proposal.filter(
            (item) =>
                `${item?.User?.surname} ${item?.User?.name || ""} ${
                    item?.User?.fatherName || ""
                }`
                    ?.toLowerCase()
                    .includes(surnameSearchQuery.toLowerCase()) &&
                item?.User?.phone
                    ?.toLowerCase()
                    .includes(phoneSearchQuery.toLowerCase()) &&
                item?.User?.email
                    ?.toLowerCase()
                    .includes(emailSearchQuery.toLowerCase()) &&
                `${item.address}, ${item.street}, ${item.homeNumber}`
                    .toLowerCase()
                    .includes(adressSearchQuery?.toLowerCase()) &&
                (!selectedDate.length ||
                    dayjs(Number(item.date)).format("DD-MM-YYYY") ===
                        dayjs(selectedDate).format("DD-MM-YYYY"))
        );
    }, [
        proposal,
        surnameSearchQuery,
        emailSearchQuery,
        phoneSearchQuery,
        adressSearchQuery,
        selectedDate,
    ]);
    // ====================

    return (
        <>
            <div className="grid grid-cols-4 gap-5 w-full mb-4 p-10 bg-white rounded-lg shadow shadow-lg">
                <TextField
                    id="surname"
                    label="Прізвище"
                    variant="outlined"
                    size="small"
                    className="col-span-1"
                    onChange={handleSurnameSearchQueryChange}
                    value={surnameSearchQuery}
                />
                <TextField
                    id="phone number"
                    label="Номер тел."
                    variant="outlined"
                    size="small"
                    className="col-span-1"
                    onChange={handlePhoneSearchQueryChange}
                    value={phoneSearchQuery}
                />
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="col-span-1"
                    onChange={handleEmailSearchQueryChange}
                    value={emailSearchQuery}
                />
                <TextField
                    id="adress"
                    label="Вулиця"
                    variant="outlined"
                    size="small"
                    className="col-span-1"
                    onChange={handleAdressSearchQueryChange}
                    value={adressSearchQuery}
                />
            </div>

            <div className="w-full mb-4 p-10 bg-white rounded-lg shadow shadow-lg">
                <ProposalsCalendar
                    proposals={proposal}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>

            <TableContainer className="bg-white rounded-lg shadow shadow-lg">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-bold">
                                Дата замірів
                            </TableCell>
                            <TableCell className="font-bold">Клієнт</TableCell>
                            <TableCell className="font-bold">
                                Номер телефону
                            </TableCell>
                            <TableCell className="font-bold">email</TableCell>
                            <TableCell className="font-bold">Адреса</TableCell>
                            <TableCell className="font-bold"></TableCell>
                            <TableCell className="font-bold">Статус</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item) => (
                            <TableRow
                                key={item.id}
                                onClick={() => handleRowClick(item)}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <TableCell>
                                    {dayjs(Number(item.date)).format(
                                        "DD.MM.YYYY"
                                    )}
                                </TableCell>
                                <TableCell>{`${item?.User?.surname || ""} ${
                                    item?.User?.name || ""
                                } ${item?.User?.fatherName || ""}`}</TableCell>
                                <TableCell>{item.User.phone}</TableCell>
                                <TableCell>{item.User.email}</TableCell>
                                <TableCell>{`${item.address}, ${item.street}, ${item.homeNumber}`}</TableCell>
                                <TableCell>
                                    {item.questionary?.answers && (
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push(
                                                    `/questionary/${item.id}`
                                                );
                                            }}
                                        >
                                            Анкета
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <StatusBadge status={item.status} />
                                    </div>
                                </TableCell>

                                {/* <TableCell>{item.}Статус</TableCell> */}
                                {/* <TableCell>
                  <div className={`p2 rounded-md w-24 text-center text-white ${item.status ? 'bg-lime-500' : 'bg-red-500'}`}>
                    {item.status ? 'Активний' : 'Неактивний'}
                  </div>
                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedProposal && (
                <ProposalDrawer
                    proposal={selectedProposal}
                    propsals={proposal}
                    setProposals={setProposal}
                    isOpen={true}
                    onClose={handleCloseDrawer}
                />
            )}
        </>
    );
};

export default TableProposalsProject;
