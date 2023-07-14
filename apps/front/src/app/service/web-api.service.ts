import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  // private readonly apiUrl = 'https://127.0.0.1:8000/api';

  private readonly apiUrl = 'http://192.168.50.117:8000/api'; //URL Android en dev selon l'IP marine


  // private readonly apiUrl = 'http://172.26.128.1:8000/api'; // for android emulator salim A

  // private readonly apiUrl = 'https://127.0.0.1:8000/api'; // for web salim A




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
