import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Product {

  name: string;
  nutriscore: string;
  image: string;
  dlc?: string;
  quantity?: number;
  storage?: string;
  category?: string;
}

interface Category {
  name: string;
}

interface Storage {
  name: string;
}

interface ApiResponse<T> {
  "hydra:member": T[];
}

interface SaveProductRequest {
  DLC: string;
  quantity: number;
  storage: string;
  category: string;
  product: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {


    // private readonly API_URL = 'http://192.168.50.39:8000/api'; //url salim B ANDROID

    // private readonly API_URL = 'http://192.168.50.117:8000/api'; //URL Android en dev selon l'IP
    // private readonly API_URL = 'http://192.168.1.9:8000/api'; //URL Android en dev selon l'IP marine domicile
  //  private readonly API_URL = 'http://192.168.1.255:8000/api'; //URL Android en dev selon l'IP marine donkey
  //  private readonly API_URL = 'http://192.168.50.118:8000/api'; //URL Android en dev selon l'IP marine

   private readonly API_URL = 'http://127.0.0.1:8000/api';  // URL de dev pour Marine



      // private readonly API_URL = 'https://127.0.0.1:8000/api'; // for web salim A


    // private readonly API_URL = 'http://192.168.50.159:8000/api'; // for android emulator salim A donkey


        //private readonly apiUrl = environment.apiUrl;



      // private readonly apiUrl = 'http://192.168.1.21:8000/api'; // for android emulator salim A

      //  private readonly apiUrl = 'http://192.168.1.21:8000/api'; // for android emulator salim A



      constructor(private http: HttpClient) { }

      getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.API_URL}/products`);
      }

      getProduct(barcode: string): Observable<Product> {
        return this.http.get<Product>(`${this.API_URL}/products/${barcode}`);
      }

      addProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.API_URL}/products`, product);
      }

      getStorages(): Observable<ApiResponse<Storage>> {
        return this.http.get<ApiResponse<Storage>>(`${this.API_URL}/storages`);
      }

      getCategories(): Observable<ApiResponse<Category>> {
        return this.http.get<ApiResponse<Category>>(`${this.API_URL}/categories`);
      }

      saveProduct(product: SaveProductRequest): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/product_user_storages`, product);
      }
    }
