'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchNearEarthObjetsFeed } from '../lib/actions';
import { NearEarthObjectDated } from '../lib/types';
import Asteroid from './asteroid';

export default function AsteroidFeed({
  initNearEarthObjects,
}: {
  initNearEarthObjects?: NearEarthObjectDated[];
}) {
  const [nearEarthObjects, setAsteroids] = useState(initNearEarthObjects);
  const [ref, inView] = useInView();

  const loadMore = useCallback(async () => {
    //TODO: pass a correct date for next data fetch
    const newNearEarthObjects = await fetchNearEarthObjetsFeed();
    setAsteroids(newNearEarthObjects);
  }, []);

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
