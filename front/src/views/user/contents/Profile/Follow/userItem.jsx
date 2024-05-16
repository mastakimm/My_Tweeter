import {Button} from "@/components/ui/button.jsx";

function UserItem({ userName, userTag, type, isFollow }) {

    const handleFollowUser = () => {
        console.log('FOLLOW USER : ', userName)
    }

    return (
        <div className={'cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 h-16 flex justify-between items-center px-5'}>
            <div className={'flex gap-4'}>
                <div className={'h-12 w-12 rounded-full bg-red-500'}></div>
                <div>
                    <div className={'text-sm font-bold'}>{ userName }</div>
                    <div className={'text-sm text-gray-500 flex gap-2'}>{ userTag }

                        {
                            (type === 'follower') &&
                                <div
                                    className={'bg-gray-600/[0.6] text-gray-300/[0.6] px-1 flex items-center rounded-[.2vw] justify-center text-xs'}>vous
                                    suit</div>
                        }
                    </div>
                </div>
            </div>

            {
                isFollow ?
                    <Button variant={'default'} onClick={handleFollowUser}
                            className={'w-20 h-8 relative'} >
                        <a className={'opacity-1 group-hover:opacity-0 absolute'}>Suivre</a>
                    </Button>
                :
                    <Button variant={'outline'}
                            className={'w-32 h-8 hover:text-red-600 hover:bg-red-800/[0.3] hover:border-red-600 group relative'} >
                        <a className={'opacity-1 group-hover:opacity-0 absolute'}>Abonné</a>
                        <a className={'opacity-0 group-hover:opacity-100 absolute'}>Se désabonner</a>
                    </Button>
            }
        </div>
    )
}

export default UserItem