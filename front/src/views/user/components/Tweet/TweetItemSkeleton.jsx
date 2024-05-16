import {CommentSvg, LikeSvg, RetweetSvg, SignetSvg} from "@/assets/tweet/index.js";
import {Skeleton} from "@/components/ui/skeleton.jsx";

export const TweetItemSkeleton = () => {

    return (
       <>
           <li>
               <div className={"flex flex-col p-4 border-gray-300 dark:border-gray-700 border-b"}>
                   <div className={"flex"}>
                       <Skeleton className="h-12 w-12 rounded-full" />

                       <div className={"ml-2.5 mt-[-0.1rem]"}>
                           <Skeleton className="h-4 w-[100px]" />
                       </div>
                   </div>

                   <div className={"ml-[3.7rem] mt-[-1.5rem] flex flex-col gap-2"}>
                       <Skeleton className="h-4 w-full"  />
                       <Skeleton className="h-4 w-[250px]"  />
                   </div>

                   <div className={"pt-4 flex justify-around"}>
                       <div className={"flex items-center gap-x-1 text-gray-500"}>
                           <CommentSvg width={"1.05rem"} fill={"none"}/>
                           <span className={"font-light text-[0.75rem]"}>0</span>
                       </div>
                       <div className={"flex items-center text-gray-500 gap-x-1"}>
                           <RetweetSvg width={"1rem"} fill={"none"}/>
                           <span className={"font-light text-[0.75rem]"}>0</span>
                       </div>
                       <div className={"flex items-center gap-x-1 text-gray-500"}>
                           <LikeSvg width={"1rem"} fill={"none"}/>
                           <span className={" text-[0.75rem] "}>0</span>
                       </div>
                       <div className={"text-gray-500"}>
                           <SignetSvg width={"1.1rem"} fill={"none"}/>
                       </div>
                   </div>
               </div>
           </li>
       </>
    )
}
