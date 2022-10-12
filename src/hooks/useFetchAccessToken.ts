import { useEffect, useState } from 'react';
import { osu } from '../logic';

interface AccessTokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
}

function useFetchAccessToken() {
  const [accessToken, setAccessToken] = useState<string>();
  const [expiration, setExpiration] = useState<Date>();

  useEffect(() => {
    const accessTokenResponse = osu.getAccessToken();
    console.log(accessTokenResponse);
  }, []);

  return { accessToken };
}

export default useFetchAccessToken;
