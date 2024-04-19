export type Links = {
  next: string;
  previous: string;
  self: string;
};

export type EstimatedDiameterValues = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};

export type EstimatedDiameter = {
  kilometers: EstimatedDiameterValues;
  meters: EstimatedDiameterValues;
  miles: EstimatedDiameterValues;
  feet: EstimatedDiameterValues;
};

export type RelativeVelocity = {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
};

export type MissDistance = {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
};

type CloseApproachData = {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: RelativeVelocity;
  miss_distance: MissDistance;
  orbiting_body: string;
};

export type NearEarthObject = {
  links: Pick<Links, 'self'>;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
};

export type NearEarthObjectDated = NearEarthObject & {
  date: string;
};

export type NearEarthObjects = {
  [date: string]: NearEarthObject[];
};

export type NearEarthObjectsFeed = {
  links: Links;
  element_count: number;
  near_earth_objects: NearEarthObjects;
};
