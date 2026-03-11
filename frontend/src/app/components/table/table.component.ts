import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DirectivaDirective } from '../../directiva.directive';
import { CarsService } from '../../core/services/cars.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [DirectivaDirective, AsyncPipe, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  private carsService = inject(CarsService);

  cars$ = this.carsService.getCars();
  activeMenuId = signal<string | null>(null);

  deleteCar(id: string): void {
    this.carsService.deleteCar(id).subscribe(() => {
      this.cars$ = this.carsService.getCars();
    });
  }

  toggleMenu(id: string): void {
    this.activeMenuId.set(this.activeMenuId() === id ? null : id);
  }
}
