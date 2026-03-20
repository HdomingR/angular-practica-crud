import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BrandsService } from './brands.service';

describe('BrandsService', () => {
  let service: BrandsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/brands';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrandsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(BrandsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all brands', () => {
    const mockBrands = ['Toyota', 'Honda', 'Ford'];

    service.getBrands().subscribe((brands) => {
      expect(brands.length).toBe(3);
      expect(brands[0]).toBe('Toyota');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockBrands);
  });

  it('should get models by brand', () => {
    const mockModels = ['Corolla', 'Yaris'];

    service.getModelsByBrand('Toyota').subscribe((models) => {
      expect(models.length).toBe(2);
      expect(models[0]).toBe('Corolla');
    });

    const req = httpMock.expectOne(`${apiUrl}/Toyota/models`);
    expect(req.request.method).toBe('GET');
    req.flush(mockModels);
  });
});
