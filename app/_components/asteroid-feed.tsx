import { fetchAsteroidFeed } from '../lib/api';
import { getDate } from '../lib/utils';
import Asteroid from './asteroid';

export default async function AsteroidFeed() {
  const data = await fetchAsteroidFeed();
  return (
    <section className="flex flex-col">
      <header>
        <h2 className="text-xl font-bold">Ближайшие подлёты астероидов</h2>
      </header>
      <ul>
        {data?.near_earth_objects[getDate()].map(asteroid => (
          <li key={asteroid.id}>{asteroid.name}</li>
        ))}
        <Asteroid />
      </ul>
    </section>
  );
}
