'use client';

import Link from 'next/link';
import React, { useContext } from 'react';
import { CartContext } from '../context/cart-context';
import { getNoun } from '../lib/utils';

export default function Cart() {
  const ctx = useContext(CartContext);

  return (
    <>
      {ctx.length > 0 && (
        <section>
          <div className="flex gap-2 fixed z-10 left-0 right-0 bottom-0 w-screen h-20 p-4 bg-neutral-800 justify-between lg:sticky lg:p-4 lg:w-[150px] lg:h-fit lg:top-[76px] lg:left-[764px] lg:rounded-3xl lg:flex-col lg:gap-8">
            <div>
              <p className="font-bold text-[1.25rem] leading-6">Корзина</p>
              <p>{`${ctx.length} ${getNoun(
                ctx.length,
                'астероид',
                'астероида',
                'астероидов'
              )}`}</p>
            </div>
            <Link
              href="/checkout"
              className="px-2 rounded-full h-12 w-[118px] font-bold bg-red-500 flex items-center justify-center"
            >
              Отправить
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
