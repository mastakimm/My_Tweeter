import React from 'react'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <header className={"flex flex-col"}>
            <h1 className={"text-2xl mt-6 ml-6 font-bold"}>Notifications</h1>
            <nav className={"flex mt-4 w-full h-full"}>
                <NavLink className={"hover:bg-gray-100 dark:hover:bg-gray-900 w-[50%] text-center p-5 duration-300"}
                         to={"/notifications"} style={({isActive}) =>  ({borderBottom: isActive ? "3px solid #22d3ee" : ""})}>Tous</NavLink>

                <NavLink className={"hover:bg-gray-100 dark:hover:bg-gray-900 w-[50%] text-center p-5 duration-300"}
                         to={"mentions"}
                         style={({isActive}) =>( {borderBottom: isActive ? "2px solid #22d3ee" : ""})}>Mentions
                </NavLink>
            </nav>
        </header>
    )
}
