import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private readonly API_URL = 'https://127.0.0.1:8000/api';

  private readonly API_URL = 'http://192.168.50.117:8000/api'; //URL Android en dev selon l'IP MARINE


  // private readonly API_URL = 'https://127.0.0.1:8000/api'; // for web salim A

  // private readonly API_URL = 'http://172.26.128.1:8000/api'; // for android emulator salim A



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
