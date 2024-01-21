import "./../styles/adminGlobals.scss";
import "./../styles/index.css";
import "./../styles/media.scss";
import "./../styles/globals.scss";
import { Provider } from "react-redux";
import store from "@/utils/store";
import {
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
} from "@mui/material";
import useLoading from "@/context/useLoading";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

// import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const inter = Inter({ subsets: ["cyrillic-ext"] });

const theme = createTheme({
    palette: {
        primary: {
            main: "#e55733", // оранжевий
        },
        secondary: {
            main: "#808080", // сірий
        },
    },
});

export default function App({ Component, pageProps }) {
    const { isLoading } = useLoading();
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${inter.style.fontFamily};
                }
            `}</style>
            <Head>
                <title>dmytrov admin</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/dmytrov.ico"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/dmytrov.ico"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/dmytrov.ico"
                />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <NextNProgress
                color="#e55733"
                startPosition={0.3}
                stopDelayMs={200}
                height={6}
                showOnShallow={true}
            />

            <Toaster />
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1000000,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
