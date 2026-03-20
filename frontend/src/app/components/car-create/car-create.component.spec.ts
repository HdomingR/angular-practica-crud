import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CarCreateComponent } from './car-create.component';
import { CarsService } from '../../core/services/cars.service';
import { NotificationService } from '../../core/services/notification.service';
import { of, throwError } from 'rxjs';
import { Car } from '../../core/model/Car';

describe('CarCreateComponent', () => {
  let component: CarCreateComponent;
  let fixture: ComponentFixture<CarCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCreateComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.carForm.valid).toBeFalse();
  });

  it('should have valid form when brand and model are filled', () => {
    component.carForm.patchValue({
      brand: 'Toyota',
      model: 'Corolla',
    });
    expect(component.carForm.get('brand')?.valid).toBeTrue();
    expect(component.carForm.get('model')?.valid).toBeTrue();
  });

  it('should add a car detail when addCarDetail is called', () => {
    component.addCarDetail();
    expect(component.carDetails.length).toBe(1);
  });

  it('should remove a car detail when removeCarDetail is called', () => {
    component.addCarDetail();
    component.removeCarDetail(0);
    expect(component.carDetails.length).toBe(0);
  });

  it('should call createCar and show success notification on submit', () => {
    const carsService = TestBed.inject(CarsService);
    const notificationService = TestBed.inject(NotificationService);
    spyOn(carsService, 'createCar').and.returnValue(of({} as Car));
    spyOn(notificationService, 'success');

    component.carForm.patchValue({ brand: 'Toyota', model: 'Corolla' });
    component.addCarDetail();
    component.carDetails.at(0).patchValue({
      mileage: 0,
      price: 20000,
      currency: 'EUR',
      manufactureYear: 2020,
      registrationDate: '2020-01-01',
      availability: true,
      licensePlate: '1234 ABC',
    });

    component.onSubmit();

    expect(carsService.createCar).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalledWith(
      'Coche creado correctamente',
    );
  });

  it('should show error notification when createCar fails', () => {
    const carsService = TestBed.inject(CarsService);
    const notificationService = TestBed.inject(NotificationService);
    spyOn(carsService, 'createCar').and.returnValue(
      throwError(() => new Error('Error')),
    );
    spyOn(notificationService, 'error');

    component.carForm.patchValue({ brand: 'Toyota', model: 'Corolla' });
    component.addCarDetail();
    component.carDetails.at(0).patchValue({
      mileage: 0,
      price: 20000,
      currency: 'EUR',
      manufactureYear: 2020,
      registrationDate: '2020-01-01',
      availability: true,
      licensePlate: '1234 ABC',
    });

    component.onSubmit();

    expect(notificationService.error).toHaveBeenCalledWith(
      'Error al crear el coche',
    );
  });
});
