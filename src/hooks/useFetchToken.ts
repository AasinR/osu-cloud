import { useEffect, useState } from 'react';

function useFetchToken() {
    const [token, setToken] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<Date>(new Date());

    const requestToken = async (): Promise<string> => {
        try {
            const result = await window.electron.getAccessToken();
            setToken(result.accessToken);
            setExpirationDate(result.expirationDate);
            return result.accessToken;
        } catch (error) {
            return ''; // invalid token string
        }
    };

    useEffect(() => {
        requestToken();
    }, []);

    const accessToken = async () => {
        const currentTime: Date = new Date();
        if (currentTime < expirationDate) {
            return token;
        }
        const newToken: string = await requestToken();
        return newToken;
    };

    return { accessToken };
}

export default useFetchToken;
