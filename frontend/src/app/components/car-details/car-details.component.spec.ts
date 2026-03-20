import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CarDetailsComponent } from './car-details.component';
import { Car } from '../../core/model/Car';
import { CarsService } from '../../core/services/cars.service';

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;

  const mockCar: Car = {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    total: 1,
    carDetails: [
      {
        mileage: 15000,
        price: 20000,
        currency: 'EUR',
        manufactureYear: 2020,
        registrationDate: '2024-10-30T10:01:35.288Z',
        availability: true,
        licensePlate: '1234 ABC',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailsComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load car data on init when id exists', () => {
    const carsService = TestBed.inject(CarsService);
    spyOn(carsService, 'getCarById').and.returnValue(of(mockCar));
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue('1');

    fixture.detectChanges();

    expect(carsService.getCarById).toHaveBeenCalledWith('1');
    expect(component.car()).toEqual(mockCar);
  });

  it('should not load car data when id is null', () => {
    const carsService = TestBed.inject(CarsService);
    spyOn(carsService, 'getCarById');
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue(null);

    fixture.detectChanges();

    expect(carsService.getCarById).not.toHaveBeenCalled();
  });
});
