'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
    <section className="flex flex-col gap-6 ml-[72px] lg:ml-[362px]">
      <header className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">Ближайшие подлёты астероидов</h2>
        <div className="flex gap-1">
          <button>в километрах</button>
          <span>|</span>
          <button>в лунных орбитах</button>
        </div>
      </header>
      <ul className="flex flex-col gap-6">
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
