import qs from 'qs';
import axios from 'axios';
import ellipsize from 'ellipsize';
import {NextApiRequest, NextApiResponse} from 'next';

type TokenReponse = {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
  scope: string;
};

const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
let cache: {title?: string; artist?: string; url?: string; lastUpdatedAt?: Date} = {
  title: undefined,
  artist: undefined,
  url: undefined,
  lastUpdatedAt: new Date(0),
};

const getAccessToken = async (): Promise<TokenReponse> => {
  const {data} = await axios.post(
    'https://accounts.spotify.com/api/token',
    qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
    {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return data;
};

export const getNowPlaying = async () => {
  if (cache.lastUpdatedAt && cache.lastUpdatedAt.getTime() + 60000 > new Date().getTime()) {
    return cache;
  }

  const {access_token: accessToken} = await getAccessToken();
  const {data} = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  cache = {
    lastUpdatedAt: new Date(),
    title: ellipsize(data?.item?.name, 35) || undefined,
    artist: ellipsize(data?.item?.artists[0]?.name, 40) || undefined,
    url: data?.item?.external_urls?.spotify || undefined,
  };

  return cache;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.SPOTIFY_CLIENT_SECRET) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({
        title: 'The Greatest Song Ever',
        artist: 'The Greatest Artist Ever',
        url: 'https://example.com',
      });
    }

    return res.status(200).json({
      title: null,
    });
  }

  return res.status(200).json(await getNowPlaying());
}
