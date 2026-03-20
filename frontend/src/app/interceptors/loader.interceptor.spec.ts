import { TestBed } from '@angular/core/testing';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { of } from 'rxjs';
import { loaderInterceptor } from './loader.interceptor';
import { LoaderService } from '../core/services/loader.service';

describe('loaderInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => loaderInterceptor(req, next));

  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show loader when request starts', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => of({} as HttpEvent<unknown>);

    interceptor(req, next).subscribe();
    expect(loaderService.isLoading()).toBeFalse();
  });

  it('should hide loader when request completes', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => of({} as HttpEvent<unknown>);

    interceptor(req, next).subscribe();
    expect(loaderService.isLoading()).toBeFalse();
  });
});
