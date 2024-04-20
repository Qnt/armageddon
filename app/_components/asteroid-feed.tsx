'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchNearEarthObjetsFeed } from '../lib/actions';
import { NearEarthObjectDated } from '../lib/types';
import NearEarthObject from './asteroid';

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
  const [date, setDate] = useState(initDate);
  const [ref, inView] = useInView();

  const loadMore = useCallback(async () => {
    const nextDate = getNextDate(date);
    const newNearEarthObjects = await fetchNearEarthObjetsFeed(nextDate);
    if (newNearEarthObjects) {
      setNearEarthObjects(prevNearEarthObjects => [
        ...prevNearEarthObjects,
        ...newNearEarthObjects,
      ]);
      setDate(nextDate);
    }
  }, [date]);

  //TODO: useEffect call when loadMore in dep arr. Fix later (maybe)
  useEffect(() => {
    if (inView) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section className="flex flex-col">
      <header>
        <h2 className="text-xl font-bold">Ближайшие подлёты астероидов</h2>
      </header>
      <ul className="flex flex-col gap-4">
        {nearEarthObjects?.map(nearEarthObject => (
          <li key={crypto.randomUUID()}>
            <NearEarthObject nearEarthObject={nearEarthObject} />
          </li>
        ))}
      </ul>
      <p ref={ref}>Loading...</p>
    </section>
  );
}
