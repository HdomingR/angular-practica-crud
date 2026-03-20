import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

/**
 * Service responsible for handling all brand-related HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/brands`;

  /**
   * Retrieves all available car brands from the API.
   * @returns Observable with an array of brand names
   */
  getBrands() {
    return this.http.get<string[]>(this.apiUrl);
  }

  /**
   * Retrieves all models for a given brand.
   * @param brandId - The brand name or ID
   * @returns Observable with an array of model names
   */
  getModelsByBrand(brandId: string) {
    return this.http.get<string[]>(`${this.apiUrl}/${brandId}/models`);
  }
}
