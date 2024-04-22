'use client';

import asteroidIcon from '@/public/asteroid_icon.png';
import diameterIcon from '@/public/diameter_icon.svg';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { CartContext, CartDispatchContext } from '../context/cart-context';
import { NearEarthObjectDated } from '../lib/types';
import { months } from '../lib/variables';
import ButtonAdd from './ui/button-add';

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = months.at(date.getMonth());
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

function getNoun(number: number, one: string, two: string, five: string) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

const formateLunarDistanceInfo = (distance: number): string => {
  const resultList = [
    distance,
    getNoun(distance, 'лунная', 'лунные', 'лунных'),
    getNoun(distance, 'орбита', 'орбиты', 'орбит'),
  ];

  return resultList.join(' ');
};

const formateName = (name: string): string => {
  return name.replace(/[()]/g, '');
};

const formateDiameter = (diameter: number): string => {
  return `${Math.round(Number(diameter))} м`;
};

const getSizeForAsteroidIcon = (
  nearEarthObject: NearEarthObjectDated
): number => {
  const diameter = Number(
    nearEarthObject.estimated_diameter.meters.estimated_diameter_max
  );
  if (diameter > 100) {
    return 40;
  }

  return 24;
};

export default function NearEarthObject({
  nearEarthObject,
}: {
  nearEarthObject: NearEarthObjectDated;
}) {
  const dispatch = useContext(CartDispatchContext);
  const cart = useContext(CartContext);
  const [inCart, setInCart] = useState(
    !!cart.find(item => item.id === nearEarthObject.id)
  );

  const date = new Date(nearEarthObject.date);
  const lunarDistance = Math.round(
    Number(nearEarthObject.close_approach_data[0].miss_distance.lunar)
  );
  const dateFormated = formatDate(date);
  const formatedName = formateName(nearEarthObject.name);
  const formatedDiameter = formateDiameter(
    Number(nearEarthObject.estimated_diameter.meters.estimated_diameter_max)
  );
  const asteroidIconSize = getSizeForAsteroidIcon(nearEarthObject);

  const handleOnClick = () => {
    if (dispatch) {
      setInCart(prevInCart => !prevInCart);
      if (inCart) {
        dispatch({ type: 'DELETE', nearEarthObjectId: nearEarthObject.id });
        return;
      }
      dispatch({ type: 'ADD', nearEarthObject });
    }
  };

  return (
    <article className="flex flex-col gap-2 max-w-[340px]">
      <header className="flex justify-between items-baseline">
        <h3 className="text-2xl font-semibold">{dateFormated}</h3>
        {nearEarthObject.is_potentially_hazardous_asteroid && (
          <p className="before:content-['⚠️']">Oпасен</p>
        )}
      </header>
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p>{formateLunarDistanceInfo(lunarDistance)}</p>
          <Image
            src={diameterIcon}
            alt="Diameter arrow icon"
            className="w-full"
          />
        </div>
        <div>
          <Image src={asteroidIcon} alt="Asteroid" height={asteroidIconSize} />
        </div>
        <div>
          <p className="font-bold underline">{formatedName}</p>
          <p className="text-xs">&Oslash; {formatedDiameter}</p>
        </div>
      </div>
      <div>
        <ButtonAdd onClick={handleOnClick} inCart={inCart} />
      </div>
    </article>
  );
}
