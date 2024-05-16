import axiosClient from "./caller.service";

const getAllUser = (filter) => {
    if (filter) {
        return axiosClient.get(`/users${filter}`)
    }
    return axiosClient.get(`/users`)
}

const getUserById = (uid) => {
    return axiosClient.get(`/user/${uid}`)
}
const getUser = () => {
    return axiosClient.get(`/user`)
}

/* GET FOLLOWERS USER */
const getUserFolowed = () => {
    return axiosClient.get(`/users/followed`)
}
const getUserFolowings = () => {
    return axiosClient.get(`/users/followings`)
}
/* END */


export const userService = {
    getAllUser, getUser, getUserById, getUserFolowed, getUserFolowings
}