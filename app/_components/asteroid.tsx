'use client';

import asteroidIcon from '@/public/asteroid_icon.png';
import diameterIcon from '@/public/diameter_icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import { NearEarthObjectDated } from '../lib/types';
import {
  formatDate,
  formateDiameter,
  formateLunarDistanceInfo,
  formateName,
  getSizeForAsteroidIcon,
} from '../lib/utils';
import ButtonAdd from './ui/button-add';

export default function NearEarthObject({
  nearEarthObject,
  sent,
  distanceUnit,
}: {
  nearEarthObject: NearEarthObjectDated;
  sent?: boolean;
  distanceUnit: 'lunar' | 'km';
}) {
  const date = new Date(nearEarthObject.date);
  const dateFormated = formatDate(date);
  const formatedName = formateName(nearEarthObject.name);
  const formatedDiameter = formateDiameter(
    Number(nearEarthObject.estimated_diameter.meters.estimated_diameter_max)
  );
  const asteroidIconHeight = getSizeForAsteroidIcon(nearEarthObject);

  let formatedDistance: string;
  let distance: number;
  switch (distanceUnit) {
    case 'lunar': {
      distance = Math.round(
        Number(nearEarthObject.close_approach_data[0].miss_distance.lunar)
      );
      formatedDistance = formateLunarDistanceInfo(distance);
      break;
    }
    case 'km': {
      distance = Math.round(
        Number(nearEarthObject.close_approach_data[0].miss_distance.kilometers)
      );
      formatedDistance = `${distance.toLocaleString()} км`;
      break;
    }
    default: {
      formatedDistance = '---';
    }
  }

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
          <p>{formatedDistance}</p>
          <Image
            src={diameterIcon}
            alt="Diameter arrow icon"
            className="w-full"
          />
        </div>
        <div>
          <Image
            src={asteroidIcon}
            alt="Asteroid"
            height={asteroidIconHeight}
          />
        </div>
        <div>
          <Link href={`/asteroids/${nearEarthObject.id}`}>
            <p className="font-bold underline">{formatedName}</p>
          </Link>
          <p className="text-xs">&Oslash; {formatedDiameter}</p>
        </div>
      </div>
      {!sent && <ButtonAdd nearEarthObject={nearEarthObject} />}
    </article>
  );
}
