import { NearEarthObject, NearEarthObjectDated } from './types';
import { months } from './variables';

export const getSizeForAsteroidIcon = (
  nearEarthObject: NearEarthObjectDated | NearEarthObject
): number => {
  const diameter = Number(
    nearEarthObject.estimated_diameter.meters.estimated_diameter_max
  );
  if (diameter > 100) {
    return 40;
  }

  return 24;
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = months.at(date.getMonth());
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const getNoun = (
  number: number,
  one: string,
  two: string,
  five: string
) => {
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
};

export const formateLunarDistanceInfo = (distance: number): string => {
  const resultList = [
    distance,
    getNoun(distance, 'лунная', 'лунные', 'лунных'),
    getNoun(distance, 'орбита', 'орбиты', 'орбит'),
  ];

  return resultList.join(' ');
};

export const formateName = (name: string): string => {
  return name.replace(/[()]/g, '');
};

export const formateDiameter = (diameter: number): string => {
  return `${Math.round(Number(diameter))} м`;
};
