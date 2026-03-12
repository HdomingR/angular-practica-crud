import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { DirectivaDirective } from '../../directiva.directive';
import { CarsService } from '../../core/services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbItem } from '../../core/model/Breadcrumb';
import { CreateCar } from '../../core/model/CarCreate';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-car-edit',
  imports: [ReactiveFormsModule, BreadcrumbComponent, DirectivaDirective],
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.scss',
})
export class CarEditComponent implements OnInit {
  private carsService = inject(CarsService);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(Dialog);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Editar coche', url: '' },
  ];

  carForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    carDetails: new FormArray([]),
  });

  get carDetails() {
    return this.carForm.get('carDetails') as FormArray;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carsService.getCarById(id).subscribe((car) => {
        this.carForm.patchValue({
          brand: car.brand,
          model: car.model,
        });

        car.carDetails.forEach((detail) => {
          this.carDetails.push(
            new FormGroup({
              mileage: new FormControl(detail.mileage, [
                Validators.required,
                Validators.min(0),
              ]),
              price: new FormControl(detail.price, [
                Validators.required,
                Validators.min(0),
              ]),
              currency: new FormControl(detail.currency, Validators.required),
              manufactureYear: new FormControl(detail.manufactureYear, [
                Validators.required,
                Validators.min(1900),
                Validators.max(new Date().getFullYear()),
              ]),
              registrationDate: new FormControl(
                new Date(detail.registrationDate).toISOString().split('T')[0],
                Validators.required,
              ),
              availability: new FormControl(detail.availability),
              licensePlate: new FormControl(
                detail.licensePlate,
                Validators.required,
              ),
            }),
          );
        });
      });
    }
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
      const id = this.route.snapshot.paramMap.get('id');
      const formValue = this.carForm.value as CreateCar;

      const payload: CreateCar = {
        ...formValue,
        carDetails: formValue.carDetails.map((detail) => ({
          ...detail,
          registrationDate: new Date(detail.registrationDate).toISOString(),
        })),
      };

      this.carsService.updateCar(id!, payload).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  openDeleteModal(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: '¿Eliminar coche?',
        message: `¿Estás seguro de que quieres eliminar este coche?`,
      },
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.carsService.deleteCar(id).subscribe(() => {
            this.router.navigate(['/']);
          });
        }
      }
    });
  }
}
