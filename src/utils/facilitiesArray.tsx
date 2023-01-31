import {
  DoubleBed,
  LedTV,
  Coffee,
  AirConditioner,
  WiFi,
  Bath,
  Shower,
  Towel,
} from '../assets/icons/facilities';
import { IFacility } from '../interfaces';

export const facilitiesArray: IFacility[] = [
  {
    label: 'Double Bed',
    component: DoubleBed,
  },
  {
    label: 'LED TV',
    component: LedTV,
  },
  {
    label: 'Coffee Set',
    component: Coffee,
  },
  {
    label: 'AC',
    component: AirConditioner,
  },
  {
    label: 'Wifi',
    component: WiFi,
  },
  {
    label: 'Towel',
    component: Towel,
  },
  {
    label: 'Shower',
    component: Shower,
  },
  {
    label: 'Bath',
    component: Bath,
  },
];
