import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = "http://163.172.177.98:8081";

const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    const data = await result.json()
    console.log("API Response: " + JSON.stringify(data))
    return data
};

export const login = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    const data = await result.json()
    console.log("Login API Response: " + JSON.stringify(data))
    return data
};

export const getUserDetails = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
    })

    const data = await result.json()
    console.log("Get user details API Response: " + JSON.stringify(data))
    return data
};

export const getAllGames = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const result = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
    })

    const data = await result.json()
    console.log("Get all games API Response: " + JSON.stringify(data))
    return data
};

export const createGame = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    
    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
    })

    const data = await result.json()
    console.log("Create game API Response: " + JSON.stringify(data))
    return data
};

export const joinGame = async (gameId: string) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    
    const result = await fetch(`${baseUrl}/game/join/${gameId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
    })

    const data = await result.json()
    console.log("Join game API Response: " + JSON.stringify(data))
    return data
};

export const getGameDetails = async (gameId: string) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
    })

    const data = await result.json()
    console.log("Get game details API Response: " + JSON.stringify(data))
    return data
};

export const sendMapConfiguration = async (gameId: string) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    
    const result = await fetch(`${baseUrl}/game/${gameId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
    })

    const data = await result.json()
    console.log("Send map configuration API Response: " + JSON.stringify(data))
    return data
};