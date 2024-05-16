import {WriteTweet} from "@/views/user/contents/Home/WriteTweet/WriteTweet.jsx";
import {TweetList} from "@/views/user/contents/Home/TweetList/TweetList.jsx"
import {Outlet} from "react-router-dom";

export const HomePage = () => {
    return (
        <div>
            <Outlet/>
            <WriteTweet/>
            <TweetList/>
        </div>
    )
}
