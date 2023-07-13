import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://172.26.128.1:8000/api';// rep

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.API_URL}/categories`);
  }

  getStorages(): Observable<any> {
    return this.http.get(`${this.API_URL}/storages`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.API_URL}/products`, product);
  }

}
