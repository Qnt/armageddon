import React from 'react';

export default function ButtonAdd({
  onClick,
  inCart,
}: {
  onClick: Function;
  inCart: boolean;
}) {
  let textColor = inCart ? 'text-slate-50' : 'text-red-600';

  return (
    <button
      type="button"
      className={`rounded-full bg-neutral-900 py-1 px-3 uppercase cursor-pointer text-xs font-bold tracking-wider ${textColor}`}
      onClick={() => onClick()}
    >
      {inCart ? 'В корзине' : 'Заказать'}
    </button>
  );
}
