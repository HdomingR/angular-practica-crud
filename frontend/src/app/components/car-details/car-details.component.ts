import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../core/model/Car';
import { CarsService } from '../../core/services/cars.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MileageStatusPipe } from '../../core/pipes/mileage-status.pipe';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../core/model/Breadcrumb';

@Component({
  selector: 'app-car-details',
  imports: [DecimalPipe, CurrencyPipe, MileageStatusPipe, BreadcrumbComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss',
})
export class CarDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carsService = inject(CarsService);

  car = signal<Car | null>(null);

  breadcrumbs: BreadcrumbItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Detalle', url: '' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carsService.getCarById(id).subscribe((data) => {
        this.car.set(data);
      });
    }
  }
}
