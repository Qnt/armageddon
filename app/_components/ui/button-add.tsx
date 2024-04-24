'use client';

import { CartContext, CartDispatchContext } from '@/app/context/cart-context';
import { NearEarthObjectDated } from '@/app/lib/types';
import { useContext } from 'react';

export default function ButtonAdd({
  nearEarthObject,
}: {
  nearEarthObject: NearEarthObjectDated;
}) {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  const isInCart = cart.some(item => item.id === nearEarthObject.id);

  let textColor = isInCart ? 'text-slate-50' : 'text-red-600';

  const handleOnClick = () => {
    if (dispatch) {
      if (isInCart) {
        dispatch({ type: 'DELETE', nearEarthObjectId: nearEarthObject.id });
      } else {
        dispatch({ type: 'ADD', nearEarthObject });
      }
    }
  };

  return (
    <button
      type="button"
      className={`w-fit rounded-full bg-neutral-900 py-1 px-3 uppercase cursor-pointer text-xs font-bold tracking-wider ${textColor}`}
      onClick={() => handleOnClick()}
    >
      {isInCart ? 'В корзине' : 'Заказать'}
    </button>
  );
}
