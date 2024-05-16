import { Header } from "@/views/user/contents/Notifications/Header/Header.jsx";
import {Outlet} from "react-router-dom";
export const NotificationsPage = () => {
    return (
        <>
            <Header />
            <Outlet/>
        </>
    )
}