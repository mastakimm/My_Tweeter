
import {ExploreSvg, HomeSvg, MessageSvg, NotificationSvg, WriteSvg} from "@/assets/navbar/index.js";
import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";

export const NavbarMobile = () => {
    return (
       <nav className={"fixed z-10 bottom-0 border-t p-4 w-full min-[500px]:hidden dark:bg-black bg-white border-t-gray-300 dark:border-t-gray-600"}>
           <ul className={"flex justify-around"}>
               <li>
                   <NavLink to={"/home"}>
                       <HomeSvg width={"1.8rem"} stroke={"stroke-black dark:stroke-white"} fill={"none"}/>
                   </NavLink>
               </li>
               <li>
                   <NavLink to={"/explore"}>
                       <ExploreSvg width={"1.8rem"} stroke={"stroke-black dark:stroke-white"} fill={"none"}/>
                   </NavLink>
               </li>
               <li>
                   <NavLink  to={"/notifications"}>
                       <NotificationSvg width={"1.8rem"} stroke={"stroke-black dark:stroke-white"} fill={"none"}/>
                   </NavLink>
               </li>
               <li>
                   <NavLink  to={"/messages"}>
                       <MessageSvg width={"1.8rem"} stroke={"stroke-black dark:stroke-white"} fill={"none"}/>
                   </NavLink>
               </li>
           </ul>

           <Button variant={'yz'} className={ 'fixed left-[calc(90vw_-_3.5rem)] top-[calc(100vh_-_10rem)] text-white mt-5 py-7 rounded-full text-xl min-[1315px]:hidden ml-1' }>
               <WriteSvg fill="none" stroke="stroke-white" width="1.3rem"/>
           </Button>
       </nav>
    )
}
