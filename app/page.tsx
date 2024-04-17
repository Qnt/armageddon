import earth from '@/public/earth.jpg';
import Image from 'next/image';
import AsteroidFeed from './_components/asteroid-feed';

export default function Home() {
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
      <div className="flex flex-col gap-4 justify-between pl-20">
        <AsteroidFeed />
        <section className="fixed flex bottom-0 left-0 right-0 bg-neutral-900 p-4">
          <header>
            <h2 className="text-xl">Корзина</h2>
            <p>2 астероида</p>
          </header>
        </section>
      </div>
    </main>
  );
}
