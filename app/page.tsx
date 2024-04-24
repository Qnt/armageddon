import AsteroidFeed from './_components/asteroid-feed';
import Cart from './_components/cart';
import Header from './_components/header';
import { fetchNearEarthObjetsFeed } from './lib/actions';

export default async function Home() {
  const date = new Date();
  const nearEarthObjects = await fetchNearEarthObjetsFeed(date);
  return (
    <>
      <Header />
      <main className="flex min-h-screen ml-[72px] gap-4 relative p-4 lg:ml-[362px]">
        <AsteroidFeed initNearEarthObjects={nearEarthObjects} initDate={date} />
        <Cart />
      </main>
    </>
  );
}
