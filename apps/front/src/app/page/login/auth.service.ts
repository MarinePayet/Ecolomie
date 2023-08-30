import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



interface User {
  id: string;
  storages: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.authBaseUrl;
  private readonly apiurl = environment.apiUrl;



  private currentUser: any = null;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedInSubject.next(isLoggedIn);
  }



  register(email: string, password: string, firstname: string, lastname: string): Observable<any> {
    const body = {
      email: email,
      plainTextPassword: password,
      firstname: firstname,
      lastname: lastname
    };

    return this.http.post(`${this.API_URL}/api/users`, body).pipe(
      tap(() => this.login(email, password)),
      catchError(error => {
        console.error('Erreur lors de l\'inscription:', error);
        return throwError(error);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };

    return this.http.post<{ [key: string]: any }>(`${this.API_URL}`, body, { withCredentials: true }).pipe(
      tap((data) => {
        this.loggedInSubject.next(true);
        localStorage.setItem('isLoggedIn', 'true'); 
        this.setUser(data);
      }),
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    this.loggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn'); // Ajout de cette ligne
  }


  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.apiurl}/me`, { withCredentials: true }).pipe(
      tap(data => {
        console.log('Réponse de getUserInfo:', data);
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
        return throwError(error);
      })
    );
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser.id : null;
  }


  private setUser(data: any): void {
    this.currentUser = data;
  }
}
