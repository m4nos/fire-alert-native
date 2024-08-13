import { Event } from '@store/events/events.types';
import { Coordinates } from '@store/map/map.types';

export type NewTrainingFormFields = {
  description: string;
  location: Event['location'];
  date: Date;
  time: Date;
};
