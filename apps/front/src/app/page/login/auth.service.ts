import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL: string;

  constructor(private http: HttpClient) {
    if (window.location.hostname === 'localhost') {
      this.API_URL = 'https://127.0.0.1:8000'; // URL par défaut pour le web
    } else if (window.location.hostname.startsWith('192.168.1.')) {
      this.API_URL = 'http://192.168.1.21:8000'; // URL pour le web (émulateur Android)
    } else {
      this.API_URL = 'https://127.0.0.1:8000'; // URL par défaut pour le web
    }
  }

  isLoggedIn = false;

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(`${this.API_URL}/auth`, body).pipe(
      tap(() => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
  }

  register(email: string, password: string, firstname: string, lastname: string): Observable<any> {
    const body = { email: email, plainTextPassword: password, firstname: firstname, lastname: lastname };
    return this.http.post(`${this.API_URL}/api/users`, body).pipe(
      switchMap(() => this.login(email, password))
    );
  }

}
