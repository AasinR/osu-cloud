import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * Requests a client credential token from the osu!api.
 */
async function getAccessToken(): Promise<{
  token_type: string;
  expires_in: number;
  access_token: string;
}> {
  const url = 'https://osu.ppy.sh/oauth/token';
  const data = {
    client_id: process.env.OSU_CLIENT_ID,
    client_secret: process.env.OSU_CLIENT_SECRET,
    grant_type: 'client_credentials',
    scope: 'public',
  };
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const token = await axios
    .post(url, data, { headers })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });

  return token;
}

const osu = {
  getAccessToken,
};

export default osu;
