import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TableComponent } from './table.component';
import { Car } from '../../core/model/Car';
import { NotificationService } from '../../core/services/notification.service';
import { CarsService } from '../../core/services/cars.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let httpMock: HttpTestingController;

  const mockCars: Car[] = [
    { id: '1', brand: 'Toyota', model: 'Corolla', total: 1, carDetails: [] },
    { id: '2', brand: 'Honda', model: 'Civic', total: 2, carDetails: [] },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:3000/cars');
    req.flush(mockCars);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    component.toggleMenu('1');
    expect(component.activeMenuId()).toBe('1');
  });

  it('should close menu when same id is toggled', () => {
    component.toggleMenu('1');
    component.toggleMenu('1');
    expect(component.activeMenuId()).toBeNull();
  });

  it('should open delete modal', () => {
    const mockCar: Car = {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      total: 1,
      carDetails: [],
    };
    spyOn(component['dialog'], 'open').and.returnValue({
      closed: of(false),
    } as unknown as ReturnType<(typeof component)['dialog']['open']>);

    component.openDeleteModal(mockCar);
    expect(component['dialog'].open).toHaveBeenCalled();
  });

  it('should show error notification when delete fails', () => {
    const mockCar: Car = {
      id: '1',
      brand: 'Toyota',
      model: 'Corolla',
      total: 1,
      carDetails: [],
    };
    const notificationService = TestBed.inject(NotificationService);
    const carsService = TestBed.inject(CarsService);
    spyOn(notificationService, 'error');

    spyOn(component['dialog'], 'open').and.returnValue({
      closed: of(true),
    } as unknown as ReturnType<(typeof component)['dialog']['open']>);

    spyOn(carsService, 'deleteCar').and.returnValue(
      throwError(() => new Error('Error')),
    );

    component.openDeleteModal(mockCar);

    expect(notificationService.error).toHaveBeenCalledWith(
      'Error al eliminar el coche',
    );
  });

  it('should call deleteCar from service', () => {
    const carsService = TestBed.inject(CarsService);
    spyOn(carsService, 'deleteCar').and.returnValue(of(undefined));
    spyOn(carsService, 'getCars').and.returnValue(of([]));

    component.deleteCar('1');

    expect(carsService.deleteCar).toHaveBeenCalledWith('1');
  });
});
