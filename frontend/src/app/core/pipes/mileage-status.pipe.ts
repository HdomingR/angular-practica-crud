import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that transforms a mileage value into a human-readable status label.
 *
 * @example
 * ```html
 * {{ detail.mileage | mileageStatus }}
 * ```
 */
@Pipe({
  name: 'mileageStatus',
})
export class MileageStatusPipe implements PipeTransform {
  /**
   * Transforms a mileage number into a status string.
   * @param mileage - The mileage value in kilometres
   * @returns 'Nuevo' if mileage is 0, 'Km 0' if under 100, 'Ocasión' otherwise
   */
  transform(mileage: number): string {
    if (mileage === 0) return 'Nuevo';
    if (mileage < 100) return 'Km 0';
    return 'Ocasión';
  }
}
