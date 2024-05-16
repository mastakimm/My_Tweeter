import {Button} from "@/components/ui/button.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "@/_services/provider/AuthProvider.jsx";
import {userService} from "@/_services/index.js";
import {useQuery, useQueryClient} from "react-query";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton.jsx";

export const ProfilePage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { getUser } = useStateContext()
    const user = getUser();

    const userFolowed = () => userService.getUserFolowed()
    const {data: followedData, isLoading: followedLoading, error: followedError} = useQuery("user_followed", userFolowed)

    const userFolowings = () => userService.getUserFolowings()
    const {data: followingsData, isLoading: followingsLoading, error: followingsError} = useQuery("user_followings", userFolowings)

    const handleNavigate = (path) => {
        navigate('/profile/' + path)
    }

    const UserBio = () => {
        const userBio = user.description

        if (userBio) {
            return (
                <div className={'text-gray-500 dark:text-gray-400 mt-4'}>{userBio}</div>
            )
        }
    }

    const CurrentPage = (path) => {
        if (location.pathname === `/profile/${path}`)
            return 'font-bold'

        return 'text-gray-500 dark:text-gray-400'
    }

    const UserAccountCreatedAt = (created_date) => {
        const date = new Date(created_date);
        return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    }

    const handleFollow = (path) => {
        navigate(`/profile/follow/${path}`)
    }

    return (
        <div className={'w-full min-h-screen relative overflow-hidden'}>
            <div className={'relative h-48 bg-gray-500 border'}>
                <div className={'absolute w-full flex items-end justify-between px-5 bottom-[-30%] z-50'}>
                    <div
                        className={'border-4 dark:border-background border-white rounded-full w-32 h-32 bg-amber-400 flex items-center justify-center'}>
                        <a className={'text-3xl'}>CG</a>
                    </div>

                    <Button variant={'outline'} className={'w-32 h-10'}>
                        <button className={'cursor-pointer flex gap-2'}>
                            Éditer le profil
                        </button>
                    </Button>
                </div>
            </div>

            <div className={'relative mt-8'}>
                <div className={'p-5 pb-0'}>

                    <div className={'mt-6'}>
                        <div className={'text-2xl text-bold font-bold'}>{user.fullname}</div>
                        <div className={'text-md text-gray-500 dark:text-gray-400'}>@{user.tagname}</div>

                        <UserBio/>

                        <div className={'mt-4'}>
                            <div className={'text-gray-500 dark:text-gray-400'}>A rejoint Twitter en { UserAccountCreatedAt(user.email_verified_at) }</div>

                            <div className={'flex gap-4 mt-2 text-md'}>
                                {
                                    followingsLoading ?
                                        <Skeleton className="h-6 w-24"/>
                                    :
                                        <button className={'flex gap-1 hover:underline'} onClick={() => handleFollow('following')}>
                                            <p className={'font-bold'}>{followingsData?.data.data.length}</p>
                                            <p className={'text-gray-500 dark:text-gray-400'}>abonnement</p></button>
                                }
                                {
                                    followedLoading ?
                                        <Skeleton className="h-6 w-24"/>
                                        :
                                        <button className={'flex gap-1 hover:underline'} onClick={() => handleFollow('')}>
                                            <a className={'font-bold'}>{followedData?.data.data.length}</a>
                                            <a className={'text-gray-500 dark:text-gray-400'}>abonné</a></button>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'mt-6'}>
                    <div className={' flex justify-around border-b'}>
                        <div onClick={() => handleNavigate('')}
                             className={'cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 py-4 w-full flex items-center justify-center' +
                                 ` ${CurrentPage('')}`}>
                            Tweets
                        </div>
                        <div onClick={() => handleNavigate('responses')}
                             className={'cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 py-4 w-full flex items-center justify-center' +
                                 ` ${CurrentPage('responses')}`}>
                            Réponses
                        </div>
                        <div onClick={() => handleNavigate('likes')}
                             className={'cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 py-4 w-full flex items-center justify-center' +
                                 ` ${CurrentPage('likes')}`}>
                            J'aime
                        </div>
                    </div>
                </div>
            </div>

            <div className={'min-h-screen'}>
                <Outlet/>
            </div>
        </div>
    )
}
