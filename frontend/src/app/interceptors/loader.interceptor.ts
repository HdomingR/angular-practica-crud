import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../core/services/loader.service';
import { inject } from '@angular/core/primitives/di';
import { finalize } from 'rxjs/internal/operators/finalize';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(finalize(() => loaderService.hide()));
};
