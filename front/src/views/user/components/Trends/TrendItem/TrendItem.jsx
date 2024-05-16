import React from 'react'
import {Link} from "react-router-dom";

export const TrendItem = ({id, title, nbTweets, pathname}) => {
    return (
        <li>
            <Link to={"linkSearch"} className={`w-full p-4 flex items-center dark:hover:bg-gray-900 hover:bg-gray-200 ${id === 10 && pathname !== "/explore" && "rounded-b-2xl"}`}>
                <span className={`text-xs text-gray-400 font-medium mr-2 ${pathname === "/explore" && "ml-4"}`}>{id} .</span>
                <div className={"flex flex-col"}>
                    <span className={"font-medium"}>{title}</span>
                    <span className={`text-xs text-gray-500 dark:text-gray-400 ml-0.5 font-light`}>{nbTweets}k posts</span>
                </div>
            </Link>
        </li>
    )
}
