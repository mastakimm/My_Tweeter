import {Link} from "react-router-dom";
import {CommentSvg, LikeSvg, RetweetSvg, SignetSvg} from "@/assets/tweet/index.js";
import {useQuery} from 'react-query';
import DefaultPP from "@/assets/temps/default_pp.png"
import {userService} from "@/_services/index.js";
import {TweetItemSkeleton} from "@/views/user/components/Tweet/TweetItemSkeleton.jsx";
import {v4 as uuidv4} from "uuid";

export const TweetItem = ({text, tweetId, userId, images, createdAt}) => {
    const baseURL = "http://localhost:8000/storage";

    const userFetcher = () => userService.getUserById(userId)

    const {data, isLoading, error} = useQuery(`user_${userId}`, userFetcher)

    const date = new Date(createdAt)

    const currentDate = new Date();
    const diffInMs = currentDate - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffMinutes = diffInMs / (1000 * 60 );
    const diffSecondes = diffInMs / (1000);


    return (
       <>
           {
               isLoading ?
                   <TweetItemSkeleton/>
               :
               <li>
                   <Link className={"flex flex-col p-4 border-gray-300 dark:border-gray-700 border-b"}
                         to={`/tweet/id/${tweetId}`}>
                       <div className={"flex"}>
                           <div className={"block h-fit w-12 min-w-12 rounded-full hover:opacity-85"}>
                               <img className={"w-100 rounded-full"} src={DefaultPP} alt="photo de profil de 'user'"/>
                           </div>
                           <div className={"ml-2.5 mt-[-0.1rem]"}>
                               <span className={"font-medium"}>{data?.data?.data?.fullname}</span>
                               <span
                                   className={"text-gray-500 mt-[0.13rem]  ml-1.5 font-light"}>@{data?.data?.data?.fullname}</span>
                               <span className={"text-gray-500 mt-[-0.4rem] ml-1 text-xl"}>.</span>
                               <span className={"text-gray-500 mt-[0.06rem]  ml-1 font-light"}>2 mars</span>
                           </div>
                       </div>

                       <div className={"ml-[3.7rem] mt-[-1.5rem]"}>
                           <p>{text}</p>
                           <div className={"flex flex-wrap gap-3 mt-3 "}>
                               {images && images.map((image) => (
                                   images.length === 1 ? (<img key={uuidv4()} className={"object-cover w-100 rounded-2xl border-gray-300 border dark:border-none"} src={`${baseURL}/${image}`} alt=""/>) :
                                       (<img key={uuidv4()}  className={"object-cover w-[47.7%] max-h-[15rem] rounded-2xl border-gray-300 border dark:border-none"}  src={`${baseURL}/${image}`} alt=""/>)
                               ))}
                           </div>
                       </div>

                       <div className={"pt-4 flex justify-around"}>
                           <div className={"flex items-center gap-x-1 text-gray-500"}>
                               <CommentSvg width={"1.05rem"} stroke={"stroke-2 stroke-gray-500"} fill={"none"}/>
                               <span className={"font-light text-[0.75rem]"}>0</span>
                           </div>
                           <div className={"flex items-center text-gray-500 gap-x-1"}>
                               <RetweetSvg width={"1.1rem"} stroke={"stroke-2 stroke-gray-500"}    fill={"none"}/>
                               <span className={"font-light text-[0.75rem]"}>0</span>
                           </div>
                           <div className={"flex items-center gap-x-1 text-gray-500"}>
                               <LikeSvg width={"1.1rem"} stroke={"stroke-2 stroke-gray-500"} fill={"none"}/>
                               <span className={"text-[0.75rem] "}>0</span>
                           </div>
                           <div className={"text-gray-500"}>
                               <SignetSvg width={"1.1rem"} fill={"none"}/>
                           </div>
                       </div>
                   </Link>
               </li>
           }
       </>
    )
}
