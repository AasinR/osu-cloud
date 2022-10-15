import { useEffect, useState } from 'react';

function useFetchToken() {
  const [token, setToken] = useState<string>('hello, im not a token');
  const [expirationDate, setExpirationDate] = useState<Date>(new Date());
  const [isValid, setIsValid] = useState<boolean>(true);

  const requestToken = async () => {
    console.log('request runs');
    try {
      const result = await window.electron.getAccessToken();
      setToken(result.accessToken);
      setExpirationDate(result.expirationDate);
    } catch (error) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    requestToken();
  }, []);

  const accessToken = async () => {
    const currentTime: Date = new Date();
    if (currentTime < expirationDate) {
      console.log('Time is okay');
      return token;
    }
    await requestToken();
    console.log('Time not good');
    return token;
  };

  return { isValid, accessToken };
}

export default useFetchToken;
