import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Car } from '../model/Car';
import { CreateCar } from '../model/CarCreate';

/**
 * Service responsible for handling all car-related HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cars`;

  /**
   * Retrieves all cars from the API.
   * @returns Observable with an array of cars
   */
  getCars() {
    return this.http.get<Car[]>(this.apiUrl);
  }

  /**
   * Retrieves a single car by its ID.
   * @param id - The car ID
   * @returns Observable with the car data
   */
  getCarById(id: string) {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new car.
   * @param car - The car data to create
   * @returns Observable with the created car
   */
  createCar(car: CreateCar) {
    return this.http.post<Car>(this.apiUrl, car);
  }

  /**
   * Updates an existing car.
   * @param id - The car ID to update
   * @param car - The updated car data
   * @returns Observable with the updated car
   */
  updateCar(id: string, car: CreateCar) {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car);
  }

  /**
   * Deletes a car by its ID.
   * @param id - The car ID to delete
   * @returns Observable with void response
   */
  deleteCar(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
