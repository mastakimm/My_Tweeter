import {Link, useLocation} from "react-router-dom"
import {TrendItem} from "@/views/user/components/Trends/TrendItem/TrendItem.jsx";

const Trends = () => {
    const location = useLocation();
    const dataTrends = [
        {
            id : 1,
            title : "TREND1",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 2,
            title : "TREND2",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 3,
            title : "TREND3",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 4,
            title : "TREND4",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 5,
            title : "TREND5",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 6,
            title : "TREND6",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 7,
            title : "TREND7",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 8,
            title : "TREND8",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 9,
            title : "TREND9",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },
        {
            id : 10,
            title : "TREND10",
            nbTweets : Math.round(Math.random() * 300 + 1)
        },

    ]

    return (
        <aside className={`sticky h-fit ${location.pathname !== "/explore" ? "dark:bg-gray-800 bg-gray-100 w-full rounded-2xl" : "bg-white dark:bg-black" }`}>
            <h2 className={`text-xl mt-3 mx-3 font-bold ${location.pathname === "/explore" && "ml-7"}`}>Tendances : France</h2>
            <ul className={"flex flex-col mt-3"}>
                {dataTrends.map(trend => (
                    <TrendItem key={trend.id} id={trend.id} title={trend.title} nbTweets={trend.nbTweets} pathname={location.pathname}/>
                ))}
            </ul>
        </aside>
    )
}
export default Trends
