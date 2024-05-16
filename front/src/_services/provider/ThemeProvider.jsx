import {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext({
    darkMode: true,
})

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'));

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{
            darkMode,
            toggleDarkMode
        }}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext)