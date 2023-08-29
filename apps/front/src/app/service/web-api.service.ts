import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface StorageCreationRequest {
  name: string;
}

interface ListCreationRequest {
  name: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

 // private readonly apiUrl = environment.apiUrl;

  private readonly apiUrl = 'http://192.168.1.21:8000/api'; // for android emulator salim A

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    if (err.status === 401 || err.status === 403) {
      console.error('Accès non autorisé.');
      return throwError('Accès non autorisé.');
    }
    return throwError(err);
  }

  // STORAGES user
  getStorages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/storages`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  deleteStorages(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/storages/${id}`)
      .pipe(catchError(this.handleError));
  }

  createStorage(name: string): Observable<any> {
    const storage: StorageCreationRequest = {
      name: name,

    };
    return this.http.post(`${this.apiUrl}/storages`, storage, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }



  getStorage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/storages/`);
  }

  deleteStorage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/storages/${id}`);
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

  getMyLists(userId: string): Observable<any> {
    const params = new HttpParams().set('user', userId);
    return this.http.get(`${this.apiUrl}/my_lists`, { params, withCredentials: true })
      .pipe(catchError(this.handleError));
  }


  createList(name: string): Observable<any> {
    const list = {
      name: name,
    };
    return this.http.post(`${this.apiUrl}/my_lists`, list , { withCredentials: true });
    pipe(catchError(this.handleError));
  }

  deleteList(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/my_lists/${id}`);
  }


  deleteProductFromList(idList: number, productId: number): Observable<any> {
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

  getProductUserStoragesSorted(order: string, searchQuery: string) {
    const params = new HttpParams()
      .set('order', order)
      .set('product.name', searchQuery);

    return this.http.get(this.apiUrl + '/product_user_storages', { params });
  }

  protected today = new Date();
  protected sevenDaysFromNow = new Date(this.today.getTime() + 7 * 24 * 60 * 60 * 1000);
  protected oneDayFromNow = new Date(this.today.getTime() + 1 * 24 * 60 * 60 * 1000);
  protected fifteenDaysFromNow = new Date(this.today.getTime() + 15 * 24 * 60 * 60 * 1000);

  getProductUserStoragesExpiringIn7Days(): Observable<any> {
    const params = new HttpParams()
      .set('DLC[strictly_after]',this.oneDayFromNow.toISOString())
      .set('DLC[before]', this.sevenDaysFromNow.toISOString());
    return this.http.get(`${this.apiUrl}/product_user_storages`, { params });
  }

  getProductUserStoragesExpiringIn15Days(): Observable<any> {
    const params = new HttpParams()
      .set('DLC[strictly_after]', this.sevenDaysFromNow.toISOString())
      .set('DLC[before]', this.fifteenDaysFromNow.toISOString());
    return this.http.get(`${this.apiUrl}/product_user_storages`, { params });
  }

  getProductUserStoragesExpiringIn1Day(): Observable<any> {
    const params = new HttpParams()
      .set('DLC[strictly_after]', this.today.toISOString())
      .set('DLC[before]', this.oneDayFromNow.toISOString());
    return this.http.get(`${this.apiUrl}/product_user_storages`, { params });
  }

  getProductUserStoragesExpired(): Observable<any> {
    const params = new HttpParams()
      .set('DLC[before]', this.today.toISOString());
    return this.http.get(`${this.apiUrl}/product_user_storages`, { params });
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

  public updateIsProductBuy(id: number, myListWithProduct: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/my_list_with_products/${id}`,myListWithProduct );
  }

  deleteMyListWithProducts(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/my_list_with_products/${id}`);
  }

}
