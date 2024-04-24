import asteroidIcon from '@/public/asteroid_icon.png';
import diameterIcon from '@/public/diameter_icon.svg';
import Image from 'next/image';
import { getNearEarthObjeсеDetails } from '../lib/api';
import {
  formateDiameter,
  formateLunarDistanceInfo,
  formateName,
  getSizeForAsteroidIcon,
} from '../lib/utils';
import ButtonAdd from './ui/button-add';

export default async function AsteroidDetailed({
  nearEarthObjectId,
}: {
  nearEarthObjectId: string;
}) {
  const nearEarthObject = await getNearEarthObjeсеDetails(nearEarthObjectId);
  if (!nearEarthObject) {
    throw new Error('oopsie');
  }

  const lunarDistance = Math.round(
    Number(nearEarthObject.close_approach_data[0].miss_distance.lunar)
  );
  const formatedName = formateName(nearEarthObject.name);
  const formatedDiameter = formateDiameter(
    Number(nearEarthObject.estimated_diameter.meters.estimated_diameter_max)
  );
  const asteroidIconHeight = getSizeForAsteroidIcon(nearEarthObject);

  return (
    <article className="flex flex-col gap-2 w-[402px]">
      <header className="flex justify-between items-baseline">
        {/* <h3 className="text-2xl font-semibold">{dateFormated}</h3> */}
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
          <Image
            src={asteroidIcon}
            alt="Asteroid"
            height={asteroidIconHeight}
          />
        </div>
        <div>
          <p className="font-bold underline">{formatedName}</p>
          <p className="text-xs">&Oslash; {formatedDiameter}</p>
        </div>
      </div>
      <ButtonAdd nearEarthObject={nearEarthObject} />
    </article>
  );
}
