import { Follow } from "@/views/user/contents/Notifications/Follow/FollowItem.jsx";
import { Like } from "@/views/user/contents/Notifications/Like/Like.jsx";
import { Retweet } from "@/views/user/contents/Notifications/Retweet/Retweet.jsx";

export const NotificationsList = () => {
    return (
        <ul className={"flex flex-col"}>
            <Follow/>
            <Like/>
            <Retweet/>
            <Follow/>
            <Like/>
            <Retweet/>
            <Follow/>
            <Like/>
            <Retweet/>
        </ul>
    )
}
