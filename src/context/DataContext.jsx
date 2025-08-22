import { createContext, useEffect, useState } from "react";
import { openModal } from "../utils/functions";

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [usuarioAtual, setUsuarioAtual] = useState()
    const [notification, setNotification] = useState()
    const [colorMode, setColorMode] = useState(true)
    const [favorites, setFavorites] = useState([])
    const [cartShop, setCartShop] = useState([])

    const newNotification = (type, title, text, options) => {
        setNotification({ type, title, text, options })
        openModal('notification')
    }

    useEffect(() => {
        const getList = () => {
            const base = JSON.parse(localStorage.getItem(`webshop-2:favorites`))
            if (base !== null) {
                setFavorites(base)
            }
        }
        getList()
    }, [])

    useEffect(() => {
        const getList = () => {
            const base = JSON.parse(localStorage.getItem(`webshop-2:cart`))
            if (base !== null) {
                setCartShop(base)
            }
        }
        getList()
    }, [])

    const value = {
        colorMode,
        setColorMode,
        usuarioAtual,
        setUsuarioAtual,
        notification,
        setNotification,
        newNotification,

        favorites,
        setFavorites,
        cartShop, 
        setCartShop
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}