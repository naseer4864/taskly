import { createContext, useState } from "react";


export const OpenContext = createContext({
    isUserOpen: false
})

export const OpenProvider = ({ children }) => {
    const [isUserOpen, setIsUserOpen] = useState(false);
    const value = { isUserOpen, setIsUserOpen }

    return <OpenContext.Provider value={value}>{children}</OpenContext.Provider>
}