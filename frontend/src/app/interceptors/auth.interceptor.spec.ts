import { TestBed } from '@angular/core/testing';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', () => {
    localStorage.setItem('auth-token', 'mock-token');

    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBe('Bearer mock-token');
      return of({} as HttpEvent<unknown>);
    };

    interceptor(req, next).subscribe();
  });

  it('should not add Authorization header when token is missing', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBeNull();
      return of({} as HttpEvent<unknown>);
    };

    interceptor(req, next).subscribe();
  });
});
