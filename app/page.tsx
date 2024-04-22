import AsteroidFeed from './_components/asteroid-feed';
import Cart from './_components/cart';
import { fetchNearEarthObjetsFeed } from './lib/actions';

export default async function Home() {
  const date = new Date();
  const nearEarthObjects = await fetchNearEarthObjetsFeed(date);
  return (
    <main className="flex min-h-screen flex-col gap-4 relative p-4">
      <header className="flex flex-col items-start gap-2">
        <h1 className="text-3xl uppercase font-passion_one text-red-700 ">
          Armageddon 2024
        </h1>
        <div>
          <p>ООО “Команда им. Б. Уиллиса”</p>
          <p>Взрываем астероиды с 1998 года.</p>
        </div>
      </header>
      <AsteroidFeed initNearEarthObjects={nearEarthObjects} initDate={date} />
      <Cart />
    </main>
  );
}
