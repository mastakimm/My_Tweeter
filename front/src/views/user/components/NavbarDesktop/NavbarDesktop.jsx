import {NavLink, useNavigate} from "react-router-dom";
import {
    HomeSvg,
    ExploreSvg,
    NotificationSvg,
    MessageSvg,
    SignetSvg,
    ProfileSvg,
    MoonSvg,
    WriteSvg,
    YZSvg,
    SunSvg
} from "@/assets/navbar/index.js"
import {Button} from "@/components/ui/button.jsx";
import {NavLinkItem} from "@/views/user/components/NavbarDesktop/NavLinkItem/NavLinkItem.jsx";
import {useThemeContext} from "@/_services/provider/ThemeProvider.jsx";
import {useState} from "react";
import {authService, userService} from "@/_services/index.js";
import {useStateContext} from "@/_services/provider/AuthProvider.jsx";
import {useQuery} from "react-query";
import defaultPP from "@/assets/temps/default_pp.png"

export const NavbarDesktop = () => {
    const navigate = useNavigate()
    const { toggleDarkMode } = useThemeContext()
    const { getUser } = useStateContext()

    const user = getUser();

    const links = [
        {
            id : 1,
            svg : HomeSvg,
            to : "/home",
            text : "Accueil",
            navigate: true,
        },
        {
            id : 2,
            svg : ExploreSvg,
            to : "/explore",
            text : "Explore",
            navigate: true,
        },
        {
            id : 3,
            svg : NotificationSvg,
            to : "/notifications",
            text : "Notifications",
            navigate: true,
        },
        {
            id : 4,
            svg : MessageSvg,
            to : "/messages",
            text : "Messages",
            navigate: true,
        },
        {
            id : 5,
            svg : SignetSvg,
            to : "/signets",
            text : "Signets",
            navigate: true,

        },
        {
            id : 6,
            svg : ProfileSvg,
            to : "/profile",
            text : "Profil",
            navigate: true,
        },
        {
            id : 7,
            svg : MoonSvg,
            navigate: false,
            action: () => {
                toggleDarkMode()
            },
            text : "Mode Nuit"
        },
        {
            id : 8,
            svg : SunSvg,
            navigate: false,
            action: () => {
                toggleDarkMode()
            },
            text : "Mode Jour"
        },
    ]

    const [ profile, setProfile ] = useState(false);

    const { setToken, setLoading } = useStateContext()

    const handleToggleProfile = () => {
        setProfile(!profile)
    }

    const handleLogout = () => {
        setLoading(true)
        authService.logoutUser()
            .finally(() => {
                setToken(false)
                navigate('/')
                setLoading(false)
            })
    }

    const handleClickWriteTweet = () => {
        navigate("/home/compose");
    }

    return (
        <nav className={"sticky h-fit top-0 max-[500px]:hidden"} >
            <ul className={"flex flex-col mt-1 gap-y-4"}>
                <li  className={"w-fit"}>
                    <NavLink to={"/home"} className={"flex items-center gap-x-3 text-xl rounded-full p-4 dark:hover:bg-gray-900 hover:bg-gray-200 duration-150"}>
                        <YZSvg fill="none" width="1.75rem"/>
                    </NavLink>
                </li>

                {
                    links.map(elem => {
                        if (elem.navigate) {
                            return (
                                <NavLinkItem key={elem.id} Svg={elem.svg} to={elem.to} linkText={elem.text}/>
                            )
                        } else {
                            return (
                                <li  key={elem.id} className={`${elem.id === 7 ? "block dark:hidden" : elem.id === 8 && "hidden dark:block"}`}>
                                    <button onClick={elem.action} className="flex items-center gap-x-4 rounded-full px-4 py-3 dark:hover:bg-gray-900 hover:bg-gray-200 duration-150">
                                        <elem.svg fill="none" stroke="stroke-black dark:stroke-white" width="1.75rem"/>
                                        <span className={"text-xl max-[1315px]:hidden"}>{elem.text}</span>
                                    </button>
                                </li>
                            )
                        }
                    })
                }
            </ul>

            <Button variant={'yz'} className={ 'w-full text-white mt-5 py-6 px-20 text-xl max-[1315px]:hidden'} onClick={handleClickWriteTweet}>Poster</Button>
            <Button variant={'yz'} className={ 'text-white mt-5 py-7 rounded-full text-xl min-[1315px]:hidden ml-1' }>
                <WriteSvg fill="none" stroke="stroke-white" width="1.5rem"/>
            </Button>

            <div className={'fixed bottom-4'}>

                {
                    profile &&
                    <div className={'absolute py-3 top-[-12vh] w-full h-18 border rounded-[.3vw] m flex flex-col gap-2 justify-center'}>
                        <div className={'dark:hover:bg-gray-900 hover:bg-gray-200 cursor-pointer px-3'}>Profil</div>
                        <div className={'dark:hover:bg-gray-900 hover:bg-gray-200 cursor-pointer px-3'} onClick={handleLogout}>Se déconnecter de {user.tagname}</div>
                    </div>
                }

                <button onClick={handleToggleProfile} className={ 'transition-all duration-200 dark:hover:bg-gray-900 hover:bg-gray-200 rounded-full p-2 max-[1315px]:hidden flex justify-between items-center gap-3' }>
                    <div className={'bg-blue-500 w-11  rounded-full flex items-center justify-center'}>
                        <img src={defaultPP} alt="" className={"w-full rounded-full"}/>
                    </div>

                    <div className={'flex-col items-start text-left mr-6'}>
                        <div className={'text-sm'}>{user.fullname}</div>
                        <div className={'text-sm'}>{user.tagname}</div>
                    </div>

                    <div>
                        ...
                    </div>
                </button>
            </div>
        </nav>
    )
}

/*
    <Button variant={'yz'} className={ 'w-full text-white mt-5 py-6 px-20 text-xl max-[1315px]:hidden' }>Poster</Button>
    <Button variant={'yz'} className={ 'text-white mt-5 py-7 rounded-full text-xl min-[1315px]:hidden ml-1' }>
        <WriteSvg fill="none" stroke="white" width="1.5rem"/>
    </Button>
 */
