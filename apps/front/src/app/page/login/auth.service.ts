import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn = false;

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post('https://127.0.0.1:8000/auth', body).pipe(
      tap(() => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
  }

  register(email: string, password: string, firstname: string, lastname: string): Observable<any> {
    const body = { email: email, plainTextPassword: password, firstname: firstname, lastname: lastname };
    return this.http.post('https://127.0.0.1:8000/api/users', body).pipe(
      switchMap(() => this.login(email, password))
    );
  }

}
