import asteroidIcon from '@/public/asteroid_icon.png';
import Image from 'next/image';
import { AsteroidData } from '../lib/types';
import { months } from '../lib/variables';

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

const getSizeForAsteroidIcon = (asteroid: AsteroidData): number => {
  const diameter = Number(
    asteroid.estimated_diameter.meters.estimated_diameter_max
  );
  if (diameter > 100) {
    return 40;
  }

  return 30;
};

export default function Asteroid({ asteroid }: { asteroid: AsteroidData }) {
  const date = new Date(asteroid.close_approach_data[0].close_approach_date);
  const lunarDistance = Math.round(
    Number(asteroid.close_approach_data[0].miss_distance.lunar)
  );
  const dateFormated = formatDate(date);
  const formatedName = formateName(asteroid.name);
  const formatedDiameter = formateDiameter(
    Number(asteroid.estimated_diameter.meters.estimated_diameter_max)
  );
  const asteroidIconSize = getSizeForAsteroidIcon(asteroid);

  return (
    <article className="flex flex-col gap-2 border rounded-md p-2 max-w-96">
      <header className="flex justify-between items-baseline">
        <h3 className="text-2xl font-semibold">{dateFormated}</h3>
        {asteroid.is_potentially_hazardous_asteroid && <p>Oпасен</p>}
      </header>
      <div className="flex gap-2 justify-between">
        <div>
          <p>{formateLunarDistanceInfo(lunarDistance)}</p>
        </div>
        <div>
          <Image
            src={asteroidIcon}
            alt="Asteroid"
            height={asteroidIconSize}
            placeholder="blur"
          />
        </div>
        <div>
          <p>{formatedName}</p>
          <p>&Oslash; {formatedDiameter}</p>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="rounded-full bg-neutral-900 py-2 px-4 uppercase cursor-pointer text-red-600"
        >
          Заказать
        </button>
      </div>
    </article>
  );
}
