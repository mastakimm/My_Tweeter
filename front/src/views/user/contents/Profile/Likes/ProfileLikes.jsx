import {useQuery} from "react-query";
import {tweetService} from "@/_services/index.js";
import {TweetItem} from "@/views/user/contents/Home/TweetList/TweetItem/TweetItem.jsx";
import {v4 as uuidv4} from "uuid";
import {TweetItemSkeleton} from "@/views/user/components/Tweet/TweetItemSkeleton.jsx";

function HasNotLikes() {
    return (
        <div className={'my-0 mx-auto w-[60%] flex flex-col gap-2 mt-8'}>
            <h6 className={'text-4xl font-bold'}>Vous n'avez encore aucun J'aime.</h6>
            <a className={'text-md'}>Appuyez sur le cœur figurant sous un post pour montrer que vous l'aimez. Il apparaîtra ensuite ici.</a>
        </div>
    )
}

function LoadingTweets() {
    return (
        <>
            <TweetItemSkeleton/>
            <TweetItemSkeleton/>
            <TweetItemSkeleton/>
        </>
    )
}

function ProfileLikes() {
    const userTweetsLike = () => tweetService.getTweetsLiked()
    const {data: tweetsLiked, isLoading } = useQuery("user_tweets_like", userTweetsLike)

    if (tweetsLiked?.data?.likedTweets?.data.length <= 0) {
        return <HasNotLikes/>
    }

    return (
        <div className={'list-none'}>
            {
                isLoading ?
                    <LoadingTweets/>
                    :
                    tweetsLiked.data.likedTweets.data.map(({ tweet }) => (
                        <TweetItem key={uuidv4()} tweetId={tweet.id} text={tweet.text} userId={tweet.user_id}
                                   createdAt={tweet.created_at}/>
                    ))
            }
        </div>
    )
}

export default ProfileLikes