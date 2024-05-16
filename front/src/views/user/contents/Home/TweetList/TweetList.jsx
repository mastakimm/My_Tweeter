
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {TweetItem} from "@/views/user/contents/Home/TweetList/TweetItem/TweetItem.jsx";
import {tweetService} from "@/_services/index.js";
import {useQuery} from "react-query";
import { v4 as uuidv4} from "uuid";
import {useStateContext} from "@/_services/provider/AuthProvider.jsx";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import axiosClient from "../../../../../_services/caller.service";

export const TweetList = () => {
    const queryClient = useQueryClient();

    const { getUser } = useStateContext()
    const user = getUser()
    const userTweets = () => tweetService.getTweetById(user.id)
    const {data, isLoading, error } = useQuery(`user_${user.id}_tweets`, userTweets)
    const [tweets, setTweets] = useState([]);

    const addNewTweetMutation = useMutation((newTweet) => newTweet);

    useEffect(() => {
        const jwtToken =Cookies.get('acces_token');
        const pusher = new Pusher('78dac66c329a20d0591d', {
            authEndpoint: '/broadcasting/auth',
            headers: {'Authorization': 'Bearer: ' + jwtToken},
            cluster: 'eu',
            encrypted: true
        });

        const userId = +user.id;
        const channel = pusher.subscribe(`tweets.${userId}`);
        console.log(userId);
        channel.bind("new_tweet", (data) => {
            console.log("received update");
            console.log(data);
            const { tweet } = data;
            tweet.image_url = JSON.parse(tweet.image_url);
            setTweets(providerTweets => [...providerTweets, tweet])
/*            addNewTweetMutation.mutate(tweet, {
                onSuccess: (data) => {
                    console.log("called");
                    queryClient.setQueryData(`user_${user.id}_tweets`, (oldData) => {
                        return { data: { data: [data, ...oldData?.data?.data] } };
                    });
                },
            });*/
        });

        axiosClient.get(`http://localhost:8000/api/tweets`)
            .then(({ data }) => {
                setTweets(data.data.map(x => x));//gg
            })

        return () => {
            pusher.unsubscribe(`tweets.${userId}`);
        };
    }, [])


    return (
        <ul>
            {tweets.map(tweet => (
                <TweetItem key={uuidv4()} tweetId={tweet.id} text={tweet.text} userId={tweet.user_id} images={tweet.image_url} createdAt={tweet.created_at}/>
            ))}
        </ul>
    )
}
