import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isLoading as false by default', () => {
    expect(service.isLoading()).toBeFalse();
  });

  it('should set isLoading to true when show is called', () => {
    service.show();
    expect(service.isLoading()).toBeTrue();
  });

  it('should set isLoading to false when hide is called', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBeFalse();
  });
});
