import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


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

  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn);
  loggedIn$ = this.loggedInSubject.asObservable();

  register(email: string, password: string, firstname: string, lastname: string): Observable<any> {
    const body = { email: email, plainTextPassword: password, firstname: firstname, lastname: lastname };


    return this.http.post(`${this.API_URL}/api/users`, body).pipe(
      switchMap((response: any) => {
        const userIdMatch = response['@id'] ? response['@id'].match(/\/(\d+)$/) : null;
        const userId = userIdMatch ? userIdMatch[1] : null;
        console.log('Utilisateur inscrit avec l\'ID:', userId);


        return this.login(email, password);
      }),
      catchError(error => {
        console.error('Erreur lors de l\'inscription:', error);
        return throwError(error);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };

    return this.http.post<any>(`${this.API_URL}/auth`, body).pipe(
      switchMap((response) => {

        const token = response.token;
        localStorage.setItem('jwt', token);
        this.isLoggedIn = true;
        this.loggedInSubject.next(true);


        const userIdUrl = response['@id'];
        const userIdMatch = userIdUrl ? userIdUrl.match(/\/(\d+)$/) : null;
        const userId = userIdMatch ? userIdMatch[1] : null;


        return this.http.get<any>(`${this.API_URL}/api/users/${74}`);
      }),
      tap((user) => {
        // Supposons que l'ID de l'utilisateur se trouve dans la propriété 'id'
        const userId = user.id;
        if (userId) {
          localStorage.setItem('userId', userId.toString());
          console.log('Utilisateur connecté avec l\'ID:', userId);
        } else {
          console.error('ID utilisateur non trouvé dans la réponse');
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInSubject.next(false); // Émettre une nouvelle valeur
    localStorage.removeItem('jwt');
  }


  getCurrentUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
