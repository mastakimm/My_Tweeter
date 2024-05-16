import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Arrow from "@/components/icons/arrow.jsx";
import {userService} from "@/_services/index.js";
import {useQuery} from "react-query";
import {useStateContext} from "@/_services/provider/AuthProvider.jsx";
import {useEffect, useState} from "react";

function FollowPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const { getUser } = useStateContext()

    const user = getUser()

    const userFolowings = () => userService.getUserFolowings()
    const {data: dataFollowings, isLoading: followingsLoading } = useQuery("user_followings", userFolowings)

    const userFolowed = () => {
        console.log('djzdhuzjhduzgd yzyd gzyg dyz')
        return userService.getUserFolowed()
    }
    const {data: dataFollowed, isLoading: followedLoading } = useQuery("user_followed", userFolowed)

    const [ transition, setTransition] = useState(false)

    const handleClose = () => {
        setTransition(false)

        setTimeout(() => {
            navigate('/profile')
        }, 500)
    }
    const handleNavigate = (path) => {
        navigate('/profile/follow/' + path)
    }


    const CurrentPage = (path) => {
        if (location.pathname === `/profile/follow/${path}`)
            return 'font-bold'

        return 'text-gray-500 dark:text-gray-400'
    }

    useEffect(() => {
        setTransition(true)
    }, []);

    return (
        <div className={`absolute bg-background top-0 w-full h-full z-[100] transition-all duration-500 ${(transition) ? 'translate-x-0' : 'translate-x-[100%]'}`}>
            <div className={'px-5 py-2 flex items-center gap-8'}>

                <Arrow onClick={handleClose} className={'dark:stroke-white stroke-black w-8 cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 rounded-full'}/>

                <div>
                    <div className={'text-xl font-bold'}>{ user.fullname }</div>
                    <div className={'text-sm'}>@{ user.tagname }</div>
                </div>
            </div>

            <div className={' flex justify-around border-b'}>
            <div
                    onClick={() => handleNavigate('')}
                    className={'cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 py-4 w-full flex items-center justify-center' +
                        ` ${CurrentPage('')}`}>
                    Abonnés
                </div>
                <div
                    onClick={() => handleNavigate('following')}
                    className={'cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 py-4 w-full flex items-center justify-center' +
                        ` ${CurrentPage('following')}`}>
                    Abonné
                </div>
            </div>


            <Outlet context={{
                dataFollowings,
                followingsLoading,

                dataFollowed,
                followedLoading
            }} />
        </div>
    )
}

export default FollowPage