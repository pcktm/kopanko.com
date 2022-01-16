import qs from 'qs';
import axios from 'axios';
import ellipsize from 'ellipsize';

type TokenReponse = {
  access_token: string;
  expires_in: number;
  token_type: "Bearer";
  scope: string;
}

const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
let count = 0;

const getAccessToken = async (): Promise<TokenReponse> => {
  const { data } = await axios.post('https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    }),
   {
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return data;  
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();
  const {data} = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  if (!data.item) return null;
  return {title: ellipsize(data.item.name, 30), artist: ellipsize(data.item.artists[0].name, 27), url: data.item.external_urls.spotify, count};
}

export default async function handler(req, res) {
  res.status(200).json(await getNowPlaying());
  count++;
}
