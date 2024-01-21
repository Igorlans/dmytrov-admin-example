import Layout from "@/components/adminpanel/Layout";
import TitlePage from "@/components/adminpanel/UI/titlePage/titlePage";
import { setNewPassword } from "@/features/passwordSlice";
import {
    Backdrop,
    Button,
    CircularProgress,
    Drawer,
    FormControl,
    TextField,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import prisma from "@/prisma/client";

export async function getServerSideProps() {
    const data = await prisma.admin.findMany();
    return {
        props: {
            data: data,
        },
    };
}

const Password = ({ data }) => {
    const currentpass = Cookies.get("password");
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [storage, setStorage] = useState(data);
    const [currentPassword, setCurrentPassword] = useState();
    const [newPasswordd, setNewPasswordd] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNewPassword(data[0].password));
    }, []);

    const updateHandler = async (id, password) => {
        try {
            if (data[0].password === currentPassword) {
                setIsLoading(true);
                const response = await fetch(`/api/admin`, {
                    method: "PUT",
                    body: JSON.stringify({ id: id, password: password }),
                });
                const json = await response.json();
                setIsLoading(false);
                const newStorage = storage.map((item) =>
                    item.id === id ? json.data : item
                );
                setStorage(newStorage);
                console.log(password);
            } else {
                console.log("error password");
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    // const handleSubmit = () => {
    //   if(currentPassword !== currentpass) {
    //     console.log('Error password');
    //   } else {
    //     Cookies.set('password', newPassword);
    //     useStore.setState((state) => ({
    //       statePassword: newPassword,
    //     }))
    //   }
    //   console.log(Cookies.get('password'))
    // }

    return (
        <Layout>
            <TitlePage title="Змінити пароль" />
            <Button
                onClick={() => setIsShow(true)}
                className="password_change mt-10"
                variant="contained"
            >
                Змінити пароль
            </Button>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1000000,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Drawer
                PaperProps={{
                    style: { padding: 30, minWidth: "40vw" },
                }}
                anchor={"right"}
                open={isShow}
                onClose={() => setIsShow(false)}
            >
                <div className="p-8" style={{ minWidth: "400px" }}>
                    <div className="mb-5">Зміна паролю</div>
                    <FormControl style={{ minWidth: "400px" }}>
                        <TextField
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            id="outlined-basic"
                            fullWidth
                            label="Поточний пароль"
                            variant="outlined"
                            multiline
                            rows={1}
                            className="mb-5"
                        />
                        <TextField
                            onChange={(e) => setNewPasswordd(e.target.value)}
                            id="outlined-basic"
                            fullWidth
                            label="Новий пароль"
                            variant="outlined"
                            multiline
                            rows={1}
                            className="mb-5"
                        />
                        {data[0].password !== currentPassword
                            ? "Пароль не збігається"
                            : "Успіх"}
                    </FormControl>
                    <div className="mt-8">
                        <Button
                            onClick={() => updateHandler(1, newPasswordd)}
                            variant="contained"
                        >
                            Зберегти
                        </Button>
                    </div>
                </div>
            </Drawer>
        </Layout>
    );
};

export default Password;
