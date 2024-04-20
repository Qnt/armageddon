'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchNearEarthObjetsFeed } from '../lib/actions';
import { NearEarthObjectDated } from '../lib/types';
import Asteroid from './asteroid';

const getNextDate = (date: Date): Date => {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + 1);
  return nextDate;
};

export default function AsteroidFeed({
  initNearEarthObjects,
  initDate,
}: {
  initNearEarthObjects?: NearEarthObjectDated[];
  initDate: Date;
}) {
  const [nearEarthObjects, setNearEarthObjects] = useState(
    initNearEarthObjects || []
  );
  const [nextDate, setNextDate] = useState(getNextDate(initDate));
  const [ref, inView] = useInView();

  const loadMore = useCallback(async () => {
    const newNearEarthObjects =
      (await fetchNearEarthObjetsFeed(nextDate)) || [];
    setNearEarthObjects(prevNearEarthObjects => [
      ...prevNearEarthObjects,
      ...newNearEarthObjects,
    ]);
    setNextDate(curNextDate => getNextDate(curNextDate));
  }, [nextDate]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <section className="flex flex-col">
      <header>
        <h2 className="text-xl font-bold">Ближайшие подлёты астероидов</h2>
      </header>
      <ul className="flex flex-col gap-4">
        {nearEarthObjects?.map(asteroid => (
          <li key={asteroid.id}>
            <Asteroid asteroid={asteroid} />
          </li>
        ))}
        <p ref={ref}>Loading...</p>
      </ul>
    </section>
  );
}
