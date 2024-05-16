import {Outlet} from "react-router-dom";
import {NavbarDesktop} from "@/views/user/components/NavbarDesktop/NavbarDesktop.jsx";
import Trends from "@/views/user/components/Trends/Trends.jsx";
import {NavbarMobile} from "@/views/user/components/NavbarMobile/NavbarMobile.jsx";
import {Search} from "@/views/user/components/Search/Search.jsx";
import {useLocation} from "react-router-dom";

function UserLayout() {
    const location = useLocation()

    return (
        <div
            className="relative flex justify-center min-h-screen max-[1100px]:gap-x-3 min-[1315px]:gap-x-10 max-[1315px]:gap-x-5">
                <NavbarDesktop/>
                <NavbarMobile/>
            <div className="min-w-20 w-[37.3rem] max-[500px]:w-screen border-gray-300 dark:border-gray-700 border-l border-r">
                <Outlet/>
            </div>
            {location.pathname !== "/explore" &&
                <div className={"sticky h-fit top-0 w-[22rem] py-2 flex flex-col gap-y-5 max-[950px]:hidden max-[1100px]:w-64"}>
                    <Search width={"w-full"}/>
                    <Trends/>
                </div>
            }
        </div>
    )}

export default UserLayout
