import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();

  const authReq = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    : req;

  return next(authReq);
};
