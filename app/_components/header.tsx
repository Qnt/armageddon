import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="flex flex-col items-start gap-2 p-4">
      <Link href="/">
        <h1 className="text-3xl uppercase font-passion_one text-red-700 ">
          Armageddon 2024
        </h1>
      </Link>
      <div>
        <p>ООО “Команда им. Б. Уиллиса”</p>
        <p>Взрываем астероиды с 1998 года.</p>
      </div>
    </header>
  );
}
