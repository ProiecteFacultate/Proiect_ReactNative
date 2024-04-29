const baseUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(baseUrl)
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
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};