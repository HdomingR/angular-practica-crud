import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mileageStatus',
})
export class MileageStatusPipe implements PipeTransform {
  transform(mileage: number): string {
    if (mileage === 0) return 'Nuevo';
    if (mileage < 100) return 'Km 0';
    return 'Ocasión';
  }
}
