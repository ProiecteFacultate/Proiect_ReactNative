import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

//we make this file tsx and not ts so we can use useEffect. And since we need to return smth we also add this interface
interface IAuthContext {
    isAuthenticated: () => boolean;
    isLoading: boolean
}

const AuthContext = createContext<IAuthContext>({
    isAuthenticated: () => {},
    isLoading: false
})

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [accessToken, setAccessToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('accessToken')
        .then(value => {
            if (value !== null) {
                setAccessToken(() => value)
            }
        })
        .finally(() => {setIsLoading(false)})
    }, []);

    const isAuthenticated = () : boolean => {
        return accessToken != null && accessToken != 'undefined' && accessToken !== ''
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);