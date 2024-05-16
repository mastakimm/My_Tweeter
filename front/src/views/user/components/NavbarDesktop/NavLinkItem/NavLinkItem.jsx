import React from 'react'
import {NavLink} from "react-router-dom";
import {HomeSvg} from "@/assets/navbar/index.js";

export const NavLinkItem = ({Svg, to, linkText}) => {

    return (
        <li className={"w-fit"}>
            <NavLink to={to} className="flex items-center gap-x-4 rounded-full px-4 py-3 dark:hover:bg-gray-900 hover:bg-gray-200 duration-150">
                <Svg fill="none" width="1.75rem" stroke={"stroke-black dark:stroke-white"}/>
                <h2 className={"text-xl max-[1315px]:hidden"}>{linkText}</h2>
            </NavLink>
        </li>
    )
}
