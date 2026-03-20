import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CarCreateComponent } from '../car-create/car-create.component';

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

  it('should have an invalid form when empty', () => {
    expect(component.carForm.valid).toBeFalse();
  });

  it('should have a valid form when brand and model are filled', () => {
    component.carForm.patchValue({ brand: 'Toyota', model: 'Corolla' });
    expect(component.carForm.get('brand')?.valid).toBeTrue();
    expect(component.carForm.get('model')?.valid).toBeTrue();
  });

  it('should add a car detail when addCarDetail is called', () => {
    expect(component.carDetails.length).toBe(0);
    component.addCarDetail();
    expect(component.carDetails.length).toBe(1);
  });

  it('should remove a car detail when removeCarDetail is called', () => {
    component.addCarDetail();
    component.addCarDetail();
    expect(component.carDetails.length).toBe(2);
    component.removeCarDetail(0);
    expect(component.carDetails.length).toBe(1);
  });

  it('should not submit when form is invalid', () => {
    spyOn(component['carsService'], 'createCar');
    component.onSubmit();
    expect(component['carsService'].createCar).not.toHaveBeenCalled();
  });
});
