'use server';

import { getNearEarthObjetsFeed } from './api';
import { NearEarthObjectDated } from './types';

export const fetchNearEarthObjetsFeed = async (
  startDate?: Date,
  endDate = startDate
): Promise<NearEarthObjectDated[] | undefined> => {
  const asteroidFeedData = await getNearEarthObjetsFeed(startDate, endDate);
  return asteroidFeedData;
};
