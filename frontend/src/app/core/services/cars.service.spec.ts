import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CarsService } from './cars.service';
import { Car } from '../model/Car';

describe('CarsService', () => {
  let service: CarsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/cars';

  const mockCar: Car = {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    total: 1,
    carDetails: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarsService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CarsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all cars', () => {
    service.getCars().subscribe((cars) => {
      expect(cars.length).toBe(1);
      expect(cars[0].brand).toBe('Toyota');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockCar]);
  });

  it('should get car by id', () => {
    service.getCarById('1').subscribe((car) => {
      expect(car.id).toBe('1');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCar);
  });

  it('should create a car', () => {
    const newCar = { brand: 'Honda', model: 'Civic', carDetails: [] };

    service.createCar(newCar).subscribe((car) => {
      expect(car.brand).toBe('Toyota');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockCar);
  });

  it('should update a car', () => {
    const updatedCar = { brand: 'Toyota', model: 'Corolla', carDetails: [] };

    service.updateCar('1', updatedCar).subscribe((car) => {
      expect(car.id).toBe('1');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockCar);
  });

  it('should delete a car', () => {
    service.deleteCar('1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
