import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Puisque le token est stocké dans un cookie, aucune étape supplémentaire
    // n'est nécessaire pour l'ajouter à la requête. Le navigateur s'en occupera.

    // Continue avec la requête originale
    return next.handle(request).pipe(
      catchError(({ status }: HttpErrorResponse) => {
        if ([UNAUTHORIZED, FORBIDDEN].includes(status)) {
          // Naviguer vers la page de login si l'utilisateur n'est pas autorisé ou interdit
          this.router.navigate(['/login']);
        }
        return throwError(status);
      })
    );
  }
}

