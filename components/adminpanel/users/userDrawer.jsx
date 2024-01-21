import { useState } from "react";
import {
    Backdrop,
    Button,
    CircularProgress,
    Drawer,
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    TextField,
} from "@mui/material";
import UserRequestItem from "@/components/adminpanel/users/userRequestItem";
import UserServiceRequestItem from "@/components/adminpanel/users/userServiceRequestItem";

const UserPage = ({ users, setUsers, user, onSave, isOpen, onClose }) => {
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [status, setStatus] = useState(user.status);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const handleUpdate = async (data) => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/admin`, {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    surname: surname,
                    name: name,
                    father_name: father_name,
                    phone: phone,
                    email: email,
                    skype: skype,
                    password: password,
                }),
            });
            const updatedUser = {
                ...user,
                name,
                surname,
                status,
            };
            console.log("save", updatedUser);
            const updatedUsers = users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
            onClose();
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Drawer
            PaperProps={{
                style: { padding: 30, minWidth: "40vw" },
            }}
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col p-10 min-w-[500px]">
                <div className="flex justify-between items-center my-5 mb-10">
                    <div>
                        ID: <span className="font-normal">{user.id}</span>
                    </div>
                    {/* <div className="flex items-center">
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel>Статус</InputLabel>
              <Select
                value={currentStatus}
                label="Статус"
                onChange={handleStatusChange}
              >
                <MenuItem value={1}>Виконано</MenuItem>
                <MenuItem value={2}>Очікується замірів</MenuItem>
                <MenuItem value={3}>На паузі</MenuItem>
              </Select>
            </FormControl>
          </div> */}
                </div>
                <div className="full-width mb-10">
                    <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                        <div>Ім'я:</div>
                        <div>
                            {`${user?.surname || ""} ${user?.name || ""} ${
                                user?.fatherName || ""
                            }`}
                        </div>
                    </div>
                    <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                        <div>Пароль:</div>
                        <div>{user?.password}</div>
                    </div>
                    <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                        <div>Телефон:</div>
                        <div>{user.phone}</div>
                    </div>
                    <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                        <div>Email:</div>
                        <div>{user.email}</div>
                    </div>
                    <div className="full-width mb-5 pb-2 flex justify-between border border-dashed border-r-0 border-l-0 border-t-0 border-orange-300">
                        <div>Skype:</div>
                        <div>{user.skype}</div>
                    </div>
                </div>
                <div className="full-width flex justify-end items-center">
                    {/* <Button variant="contained" color="primary" onClick={() => handleUpdate(user)}>
            Зберегти
          </Button> */}
                    <Button variant="contained" color="primary">
                        Завантажити документ
                    </Button>
                </div>
                <div className="tabs mt-6">
                    {["Заявки", "Додаткові послуги"].map((tab, index) => (
                        <a
                            onClick={() => setActiveTab(index)}
                            className={`tab ${
                                index === activeTab ? "tab-active" : ""
                            } font-bold text-xl`}
                        >
                            {tab}
                        </a>
                    ))}
                </div>
                {activeTab === 0 ? (
                    <div className={"flex flex-col gap-3 my-4"}>
                        {user?.Request.map((item) => (
                            <UserRequestItem key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className={"flex flex-col gap-3 my-4"}>
                        {user?.ServicesRequest?.map((item) => (
                            <UserServiceRequestItem key={item.id} item={item} />
                        ))}
                    </div>
                )}
                {/*{user.Request.length*/}
                {/*    ?*/}
                {/*    <div className={'flex flex-col gap-3 my-4'}>*/}
                {/*      <h2>Заявки :</h2>*/}
                {/*      {user.Request.map(item =>*/}
                {/*          <UserRequestItem key={item.id} item={item} />*/}
                {/*      )}*/}
                {/*    </div>*/}
                {/*    : null*/}
                {/*}*/}
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
        </Drawer>
    );
};

export default UserPage;
