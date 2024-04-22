'use client';

import React, { useContext } from 'react';
import { CartContext } from '../context/cart-context';

export default function Cart() {
  const ctx = useContext(CartContext);
  return (
    <>
      {ctx.length > 0 && (
        <section className="flex gap-2 fixed z-10 left-0 right-0 bottom-0 w-screen h-20 p-4 bg-neutral-800 justify-between">
          <div>
            <p className="font-bold text-[1.25rem] leading-6">Корзина</p>
            <p>{ctx.length}</p>
          </div>
          <button className="py-4 px-2 rounded-full w-[118px] font-bold bg-red-500">
            Отправить
          </button>
        </section>
      )}
    </>
  );
}
