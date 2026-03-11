import { CarDetail } from './CarDetails';

export interface Car {
  id: string;
  brand: string;
  model: string;
  total: number;
  carDetails: CarDetail[];
}
