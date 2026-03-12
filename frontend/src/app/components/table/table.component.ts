import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DirectivaDirective } from '../../directiva.directive';
import { CarsService } from '../../core/services/cars.service';
import { RouterLink } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Car } from '../../core/model/Car';

@Component({
  selector: 'app-table',
  imports: [DirectivaDirective, AsyncPipe, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  private carsService = inject(CarsService);
  private dialog = inject(Dialog);

  cars$ = this.carsService.getCars();
  activeMenuId = signal<string | null>(null);

  openDeleteModal(car: Car): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: '¿Eliminar?',
        message: `¿Estas seguro de que quieres eliminar el ${car.brand} ${car.model}?`,
      },
    });

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.carsService.deleteCar(car.id).subscribe(() => {
          this.cars$ = this.carsService.getCars();
        });
      }
    });
  }

  deleteCar(id: string): void {
    this.carsService.deleteCar(id).subscribe(() => {
      this.cars$ = this.carsService.getCars();
    });
  }

  toggleMenu(id: string): void {
    this.activeMenuId.set(this.activeMenuId() === id ? null : id);
  }
}
