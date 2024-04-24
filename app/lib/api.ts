import axios from 'axios';
import 'dotenv/config';
import {
  NearEarthObject,
  NearEarthObjectDated,
  NearEarthObjectsFeed,
} from './types';
import { API_KEY, BASE_URL, paths } from './variables';

const generateURL = (path: string, searchParams: URLSearchParams) => {
  const url = new URL(path, BASE_URL);
  url.search = searchParams.toString();
  return url.toString();
};

export const getNearEarthObjeсtsFeed = async (
  startDate: Date,
  endDate = startDate
): Promise<NearEarthObjectDated[] | undefined> => {
  try {
    if (!API_KEY) {
      throw new Error('Invalid API key');
    }

    const url = generateURL(
      paths.asteroids.feed,
      new URLSearchParams({
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        api_key: API_KEY,
      })
    );

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

export const getNearEarthObjeсеDetails = async (
  id: string
): Promise<NearEarthObjectDated | undefined> => {
  try {
    if (!API_KEY) {
      throw new Error('Invalid API key');
    }

    const url = generateURL(
      `${paths.asteroids.lookup}/${id}`,
      new URLSearchParams({
        api_key: API_KEY,
      })
    );

    const res = await axios.get(url, { family: 4 });

    const data = (await res.data) as NearEarthObject;
    // TODO: write cottcet closest date
    return { ...data, date: '' };
  } catch (error) {
    console.error('Error fetching data:\n', error);
  }
};
