import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  private readonly apiUrl = 'http://192.168.50.159:8000/api';

  constructor(private http: HttpClient) { }

  getStorages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/storages`);
  }

  getStorage(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/storages/${id}`);
  }

  deleteStorage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/storages/${id}`);
  }

  updateStorage(id: number, name: string): Observable<any> {
    const updatedData = { name: name };
    return this.http.put(`${this.apiUrl}/storages/${id}`, updatedData);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  saveProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }
}
