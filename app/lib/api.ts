import axios from 'axios';
import 'dotenv/config';
import { AsteroidFeedData } from './types';
import { getDate } from './utils';
import { API_KEY, BASE_URL, paths } from './variables';

const generateURL = (path: string, searchParams: URLSearchParams) => {
  const url = new URL(path, BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};

export const fetchAsteroidFeed = async () => {
  try {
    if (!API_KEY) {
      throw new Error('Invalid API key');
    }
    const date = getDate();
    const searchParams = new URLSearchParams({
      start_date: date,
      end_date: date,
      api_key: API_KEY,
    });

    console.log('fetching data');
    const url = generateURL(paths.asteroids.feed, searchParams);
    const res = await axios.get(url, { family: 4 });
    // if (!res.ok) {
    //   throw new Error('Failed to fetch data');
    // }
    const data: AsteroidFeedData = await res.data;

    return data;
  } catch (error) {
    console.error('Error fetching data:\n', error);
  }
};
