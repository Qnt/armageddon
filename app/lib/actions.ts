'use server';

import { getNearEarthObjeсtsFeed } from './api';
import { NearEarthObjectDated } from './types';

export const fetchNearEarthObjetsFeed = async (
  startDate: Date,
  endDate = startDate
): Promise<NearEarthObjectDated[] | undefined> => {
  const asteroidFeedData = await getNearEarthObjeсtsFeed(startDate, endDate);
  return asteroidFeedData;
};
