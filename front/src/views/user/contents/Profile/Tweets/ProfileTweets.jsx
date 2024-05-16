import { tweetService } from "@/_services/index.js";

import {useStateContext} from "@/_services/provider/AuthProvider.jsx";
import {TweetItem} from "@/views/user/contents/Home/TweetList/TweetItem/TweetItem.jsx";
import {v4 as uuidv4} from "uuid";
import {TweetItemSkeleton} from "@/views/user/components/Tweet/TweetItemSkeleton.jsx";
import {useQuery} from "react-query";


function LoadingTweets() {
    return (
        <>
            <TweetItemSkeleton/>
            <TweetItemSkeleton/>
            <TweetItemSkeleton/>
        </>
    )
}

function ProfileTweets() {
    const { getUser } = useStateContext()

    const user = getUser()

    const userTweets = () => tweetService.getTweetById(user.id)
    const {data: tweets, isLoading, error } = useQuery(`user_tweets`, userTweets)

    return (
        <div className={'list-none'}>
            {
                isLoading ?
                    <LoadingTweets/>
                :
                    tweets.data.data.map(tweet => (
                        <TweetItem key={uuidv4()} tweetId={tweet.id} text={tweet.text} userId={tweet.user_id} createdAt={tweet.created_at}/>
                    ))
            }
        </div>
    )
}

export default ProfileTweets