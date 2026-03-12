import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CarsService } from '../../core/services/cars.service';
import { CreateCar } from '../../core/model/CarCreate';
import { BreadcrumbItem } from '../../core/model/Breadcrumb';
import { DirectivaDirective } from '../../directiva.directive';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-car-create',
  imports: [
    ReactiveFormsModule,
    BreadcrumbComponent,
    DirectivaDirective,
    RouterModule,
  ],
  templateUrl: './car-create.component.html',
  styleUrl: './car-create.component.scss',
})
export class CarCreateComponent {
  private carsService = inject(CarsService);
  protected router = inject(Router);
  private notificationService = inject(NotificationService);

  carForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    carDetails: new FormArray([]),
  });

  get carDetails() {
    return this.carForm.get('carDetails') as FormArray;
  }

  addCarDetail(): void {
    const detailGroup = new FormGroup({
      mileage: new FormControl(0, [Validators.required, Validators.min(0)]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      currency: new FormControl('', Validators.required),
      manufactureYear: new FormControl(new Date().getFullYear(), [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ]),
      registrationDate: new FormControl('', Validators.required),
      availability: new FormControl(true),
      licensePlate: new FormControl('', Validators.required),
    });

    this.carDetails.push(detailGroup);
  }

  removeCarDetail(index: number): void {
    this.carDetails.removeAt(index);
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const formValue = this.carForm.value as CreateCar;

      const payload: CreateCar = {
        ...formValue,
        carDetails: formValue.carDetails.map((detail) => ({
          ...detail,
          registrationDate: new Date(detail.registrationDate).toISOString(),
        })),
      };

      this.carsService.createCar(payload).subscribe({
        next: () => {
          this.notificationService.success('Coche creado correctamente');
          this.router.navigate(['/']);
        },
        error: () => {
          this.notificationService.error('Error al crear el coche');
        },
      });
    }
  }

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Nuevo coche', url: '/cars/create' },
  ];
}
