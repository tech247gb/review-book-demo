import React, { createContext, useContext, useState } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// export const AuthContext = createContext<AuthContextType|null >(null)

// export const useAuthContext = useContext<AuthContextType|null >(AuthContext)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};


export const AuthContextProvider = ({ children }:{children :React.ReactNode}) => {
    const token = localStorage.getItem('token')
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(token ? true :false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};