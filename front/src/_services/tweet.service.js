import axiosClient from "./caller.service";

const newTweet = (data) => {
    return axiosClient.post(`/tweets`, data)
}

const getTweetById = (uid) => {
    return axiosClient.get(`/tweets/${uid}/get`)
}

const getTweetsLiked = () => {
    return axiosClient.get(`/tweets/liked`)
}

export const tweetService = {
    newTweet, getTweetById, getTweetsLiked
}