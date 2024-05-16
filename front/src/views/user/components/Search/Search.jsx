import {ExploreSvg} from "@/assets/navbar/index.js";

export const Search = ({width}) => {

    return (
        <div className={`sticky ${width} py-0.5 h-fit flex items-center px-3.5 bg-gray-200 dark:bg-gray-800 rounded-3xl focus-within:bg-white border focus-within:border-blue-400 focus-within:border`}>
            <ExploreSvg width={"1.5rem"} fill={"none"} stroke={"stroke-gray-500"}/>
            <input className={`w-full outline-0 pl-2 py-2.5 bg-gray-200 dark:bg-gray-800 focus:bg-white`} type="text"/>
        </div>
    )
}
