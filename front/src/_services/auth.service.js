import axiosClient from "./caller.service";

let registerUser = (data) => {
    return axiosClient.post(`/signup`, data)
}

let loginUser = (data) => {
    return axiosClient.post(`/login`, data)
}

let logoutUser = () => {
    return axiosClient.post(`/logout`)
}

export const authService = {
    registerUser, loginUser, logoutUser
}