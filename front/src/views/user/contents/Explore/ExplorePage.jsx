import {Search} from "@/views/user/components/Search/Search.jsx";
import Trends from "@/views/user/components/Trends/Trends.jsx";
import {Link} from "react-router-dom";
import EpitechSponso from "@/assets/explore/epitech_sponso.jpg";
export const ExplorePage = () => {
    return (
        <>
            <header className={"sticky top-0 z-10 flex justify-center p-2 bg-white dark:bg-black"}>
                <Search width={"w-[35rem]"}/>
            </header>
            <section>
                <Link to={"https://www.webacademie.org/"} target={"_blank"} className={"relative w-full"}>
                    <img src={EpitechSponso} className={"w-full"} alt="formation developpeur web webacadémie"/>
                    <div className={"absolute flex flex-col gap-y-2 bottom-2 left-2 text-white font-bold"}>
                        <h1 className={"text-3xl max-[700px]:text-[calc(5vw_-_0.3rem)] max-[500px]:text-[5vw]"}>
                            Devenez intégrateur / développeur web
                        </h1>
                        <span className={"max-[700px]:text-[calc(5vw_-_1rem)] max-[500px]:text-[calc(5vw_-_0.5rem)]"}>
                        Formation en 2 ans, sans frais pour l’apprenant
                    </span>
                    </div>

                </Link>
                <Trends/>
            </section>
        </>

    )
}
