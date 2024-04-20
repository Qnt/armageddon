import axios from 'axios';
import 'dotenv/config';
import { NearEarthObjectDated, NearEarthObjectsFeed } from './types';
import { formatDate } from './utils';
import { API_KEY, BASE_URL, paths } from './variables';

type NearEarthObjectsFeedParams = {
  start_date?: Date;
  end_date?: Date;
  api_key: string;
};

const generateURL = (path: string, searchParams: URLSearchParams) => {
  const url = new URL(path, BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};

const generateSeacrhParams = (
  searchParams: NearEarthObjectsFeedParams
): URLSearchParams => {
  return new URLSearchParams({
    ...(searchParams.start_date
      ? { start_date: formatDate(searchParams.start_date) }
      : {}),
    ...(searchParams.end_date
      ? { end_date: formatDate(searchParams.end_date) }
      : {}),
    api_key: searchParams.api_key,
  });
};

export const getNearEarthObjetsFeed = async (
  startDate?: Date,
  endDate = startDate
): Promise<NearEarthObjectDated[] | undefined> => {
  try {
    if (!API_KEY) {
      throw new Error('Invalid API key');
    }

    const searchParams = generateSeacrhParams({
      start_date: startDate,
      end_date: endDate,
      api_key: API_KEY,
    });

    const url = generateURL(paths.asteroids.feed, searchParams);

    const res = await axios.get(url, { family: 4 });

    const data = (await res.data) as NearEarthObjectsFeed;
    const adaptedData = Object.keys(data.near_earth_objects).flatMap(date => {
      return data.near_earth_objects[date].map(neo => {
        return { ...neo, date };
      });
    });
    return adaptedData;
  } catch (error) {
    console.error('Error fetching data:\n', error);
  }
};
