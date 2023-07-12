import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private readonly apiUrl = 'https://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }


  getStorages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/storages`);
  }

  deleteStorage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/storages/${id}`);
  }

  editStorage(id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/storages/${id}`, data);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }



}
