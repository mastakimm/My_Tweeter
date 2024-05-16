import {createContext, useContext, useEffect, useState} from "react";

import Loading from "../../components/loading/loading.jsx";
import Cookies from "js-cookie";
import {userService} from "@/_services/index.js";

const StateContext = createContext({
    token: null,
    setUser: () => {},
    setToken: () => {},
})

export const AuthProvider = ({ children }) => {
    const [user, _setUser] = useState(false);
    const [token, _setToken] = useState(Cookies.get('acces_token'));
    const [loading, setLoading] = useState(false)

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            Cookies.set('acces_token', token, { expires: 7 });
        } else {
            _setUser(false)
            Cookies.remove('acces_token')
        }
    }

    const setUser = (user) => {
        _setUser(user)
    }

    const getUser = () => user

    const isLogged = () => {
        return !!token
    }

    useEffect(() => {
        setLoading(true)

        if (!user) {
            userService.getUser()
                .then(({data}) => {
                    setUser(data)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, []);

    return (
        <StateContext.Provider value={{
            user,
            getUser,
            setUser,
            token,
            setToken,
            isLogged,
            setLoading
        }}>
            {
                loading
                    ? <Loading/>
                    : children
            }
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)