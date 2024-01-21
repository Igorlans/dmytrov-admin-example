import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import styles from "./loginForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setNewPassword } from "@/features/passwordSlice";

const LoginForm = ({ data }) => {
    useEffect(() => {
        dispatch(setNewPassword(data[0].password));
    }, []);

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const pass = useSelector((state) => state.password.user);
    const dispatch = useDispatch();

    Cookies.set("password", pass);
    const savedPass = Cookies.get("password");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === "") {
            setError("Введіть пароль");
        } else if (password !== savedPass) {
            setError("Ви ввели неправильний пароль!");
        } else if (password === savedPass) {
            setError("Вхід...");
            Cookies.set("password", 111, { expires: 2 });
            router.push("/tariffs");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <TextField
                    label="Пароль"
                    color="primary"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div>{error}</div>}
            </div>

            <Button className={styles.button} type="submit" variant="contained">
                Увійти
            </Button>
        </form>
    );
};

export default LoginForm;
