import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home/Home";
import VerifyForm from "../Page/VerifyForm/VerifyForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: "/verifyForm",
        element: <VerifyForm/>
    }
])

export default router;
