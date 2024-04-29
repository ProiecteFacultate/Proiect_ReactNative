import React, { createContext, useContext, useEffect, useState } from "react";
import { register } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
    token: string;
    register: (email: string, password: string) => Promise<void>;
    isLoading: boolean

}

const AuthContext = createContext<IAuthContext>({
    token: '',
    register: async () => {},
    isLoading: false
})

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        AsyncStorage.getItem('token')
        .then(value => {
            if (value !== null) {
                setToken(value)
            }
        })
        .finally(() => {setIsLoading(false)})
    }, []);

    const handleRegister = async (email: string, password: string) => {
        try {
            console.log(email + " " + password);
            const result = await register(email, password);
            console.log(result)
            setToken(result);
            await AsyncStorage.setItem('token', result);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            register: handleRegister,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
