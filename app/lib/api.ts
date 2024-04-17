import 'dotenv/config';
import { headers } from 'next/headers';
import { AsteroidFeed } from './types';
import { getDate } from './utils';
const API_KEY = process.env.API_KEY;

const BASE_URL = new URL('https://api.nasa.gov/');

const generateURL = ({
  path,
  searchParams,
}: {
  path: string;
  searchParams: URLSearchParams;
}) => {
  const url = new URL(path, BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};

export const fetchAsteroidFeed = async () => {
  const date = getDate();
  const searchParams = new URLSearchParams(
    `start_date=${date}&end_date=${date}&api_key=${API_KEY}`
  );
  try {
    const res = await fetch(
      generateURL({ path: 'neo/rest/v1/feed', searchParams })
    );
    console.log('is res ok?', res);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data: AsteroidFeed = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
