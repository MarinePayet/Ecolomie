import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Category {
  name: string;
}

interface ApiResponse<T> {
  "hydra:member": T[];
  // autres propriétés si nécessaire...
}

@Injectable({
  providedIn: 'root'
})

export class ApiForListService {


    // private readonly API_URL = 'http://192.168.50.39:8000/api'; //url salim B ANDROID

    // private readonly API_URL = 'http://192.168.50.117:8000/api'; //URL Android en dev selon l'IP

    private readonly API_URL = 'http://127.0.0.1:8000/api';  // URL de dev pour Marine

   //  private readonly API_URL = 'https://127.0.0.1:8000/api'; // for web salim A
    // private readonly API_URL = 'http://192.168.50.159:8000/api'; // for android emulator salim A donkey

      //  private readonly API_URL = 'http://192.168.1.21:8000/api'; // for android emulator salim A


  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}/products`);
  }

  getProduct(barcode:string): Observable<any> {
    return this.http.get(`${this.API_URL}/products/${barcode}`);
  }

  getCategories(): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.API_URL}/categories`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.API_URL}/product_for_lists`, product);
  }


  addMyListWithProduct(myListData: any) {
    return this.http.post(`${this.API_URL}/my_list_with_products`, myListData);
  }

  saveProduct(product: any): Observable<any> {
    return this.http.post(`${this.API_URL}/product_user_storages`, product);
  }
}
