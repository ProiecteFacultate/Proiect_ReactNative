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

export const getUserDetails = async (id : any, email: string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders
        }
    })

    const data = await result.json()
    console.log("Get user details API Response: " + JSON.stringify(data))
    return data
};

export const getGames = async () => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            ...baseHeaders
        }
    })

    const data = await result.json()
    console.log("Get games API Response: " + JSON.stringify(data))
    return data
};