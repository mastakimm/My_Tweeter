import React from 'react'
import {Link} from "react-router-dom";
import {ProfileSvg} from "@/assets/navbar/index.js";
import PPUser from "@/assets/temps/ppuser.jpeg";

export const Follow = () => {
    return (
        <li className={"hover:bg-gray-100 dark:hover:bg-gray-900 duration-300 border-gray-300 dark:border-gray-700 border-b"}>
            <Link className={""} to={"tweetid"}>
                <article className={"flex flex-col px-4 py-2.5 gap-y-2"}>
                    <div className={"flex gap-x-2 items-center mt-1"}>
                        <ProfileSvg width={"2rem"} stroke={""} fill={"#0ea5e9"}/>
                        <div className={"w-11"}>
                            <img src={PPUser} alt="" className={"rounded-full w-100"}/>
                        </div>
                    </div>
                    <span className={"ml-10"}><span className={"font-bold"}>Antony</span> vous suis</span>
                </article>
            </Link>
        </li>
    )
}
