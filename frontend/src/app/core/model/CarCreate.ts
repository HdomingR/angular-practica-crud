import { CarDetail } from './CarDetails';

export interface CreateCar {
  brand: string;
  model: string;
  carDetails: Omit<CarDetail, 'id'>[];
}
