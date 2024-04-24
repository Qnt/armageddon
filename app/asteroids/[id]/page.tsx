import AsteroidDetailed from '@/app/_components/asteroid-detailed';
import Cart from '@/app/_components/cart';
import Footer from '@/app/_components/footer';
import Header from '@/app/_components/header';
import { Suspense } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen gap-4 relative p-4 ml-[72px] lg:ml-[362px]">
        <Suspense fallback={<p className="w-[402px]">Loading...</p>}>
          <AsteroidDetailed nearEarthObjectId={params.id} />
        </Suspense>
        <Cart />
      </main>
      <Footer />
    </>
  );
}
