import { Coordinates } from '@store/map/map.types';

export type NewTrainingFormFields = {
  description: string;
  location: Coordinates;
  date: string;
  organizer?: string;
};
