
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

   //private readonly apiUrl = 'http://192.168.50.39:8000/api'; //URL Android en dev selon l'IP salim B

   //private readonly apiUrl = 'http://192.168.50.117:8000/api'; //URL Android en dev selon l'IP marine



   private readonly apiUrl = 'http://192.168.1.21:8000/api'; // for android emulator salim A


  // private readonly apiUrl = 'http://192.168.50.159:8000/api'; // for android emulator salim A donkey

   // private readonly apiUrl = 'https://127.0.0.1:8000/api'; // for web salim A


   // private readonly apiUrl = 'http://127.0.0.1:8000/api'; // for web Marine



  constructor(private http: HttpClient) { }

  // STORAGES

  getStorages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/storages`);
  }

  deleteStorage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/storages/${id}`);
  }

  createStorage(name: string): Observable<any> {
    const storage = { name: name };
    return this.http.post(`${this.apiUrl}/storages`, storage);
  }

  // PRODUCTS

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  saveProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  // CATEGORIES

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  // LISTS

  getMyLists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my_lists`);
  }

  deleteList(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/my_lists/${id}`);
  }

  createList(name: string): Observable<any> {
    const list = { name: name };
    return this.http.post(`${this.apiUrl}/my_lists`, list);
  }

  deleteProductFromList(idList: number, productId: number): Observable <any> {
    return this.http.delete(`${this.apiUrl}/my_lists/${idList}/${productId}`);
  }

  // PRODUCT_USER_STORAGE

  getProductUserStorage(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/product_user_storages/${id}`);
  }

  getProductUserStorages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product_user_storages`);
  }


  updateProductUserStorage(id: number, productUserStorage: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/product_user_storages/${id}`, productUserStorage);
  }

  deleteProductUserStorage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product_user_storages/${id}`);
  }

  // PRODUCT_FOR_LIST

  getProductsForList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product_for_lists`);
  }

  getProductForList(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/product_for_lists/${id}`);
  }

  updateProductForList(id: number, productForList: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/product_for_lists/${id}`, productForList);
  }

  deleteProductForList(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/product_for_lists/${id}`);
  }

  // MY_LIST_WITH_PRODUCT

  getMyListWithProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my_list_with_products`);
  }

  updateMyListWithProducts(id: number, myListWithProduct: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/my_list_with_products/${id}`, myListWithProduct);
  }

  deleteMyListWithProducts(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/my_list_with_products/${id}`);
  }
}

