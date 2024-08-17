'use client';

import { useContext, useEffect } from 'react';
import NearEarthObject from '../_components/asteroid';
import Footer from '../_components/footer';
import Header from '../_components/header';
import { CartContext, CartDispatchContext } from '../context/cart-context';

export default function Page() {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  // useEffect(() => {
  //   return () => {
  //     if (dispatch) {
  //       dispatch({ type: 'RESET' });
  //     }
  //   };
  // }, [dispatch]);

  return (
    <>
      <Header />
      <main className="flex min-h-screen gap-4 relative p-4">
        <section className="flex flex-col gap-6 ml-[72px] lg:ml-[362px]">
          <header className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">
              {cart.length > 0 ? 'Заказ отправлен!' : 'Корзина пуста'}
            </h2>
          </header>
          {cart.length > 0 && (
            <ul className="flex flex-col gap-6">
              {cart.map((nearEarthObject, i) => (
                <li key={`${nearEarthObject.id}_${i}`}>
                  <NearEarthObject nearEarthObject={nearEarthObject} sent />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
