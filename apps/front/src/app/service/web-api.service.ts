import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface StorageCreationRequest {
  name: string;
  user: string;
}

interface ListCreationRequest {
  name: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  //private readonly apiUrl = 'http://192.168.50.39:8000/api'; //URL Android en dev selon l'IP salim B

  // private readonly apiUrl = 'http://192.168.50.117:8000/api'; //URL Android en dev selon l'IP marine

  // private readonly apiUrl = 'http://192.168.50.118:8000/api'; //URL Android en dev selon l'IP marine DONKEY

  // private readonly apiUrl = 'http://192.168.1.21:8000/api'; // for android emulator salim A

  //  private readonly apiUrl = 'http://192.168.1.9:8000/api'; //URL Android en dev selon l'IP marine domicile

  //  private readonly apiUrl = 'http://192.168.1.21:8000/api'; // for android emulator salim A

  // private readonly apiUrl = 'http://192.168.50.159:8000/api'; // for android emulator salim A donkey

   private readonly apiUrl = 'https://127.0.0.1:8000/api'; // for web salim A

 // private readonly apiUrl = 'http://127.0.0.1:8000/api'; // for web Marine

  constructor(private http: HttpClient) { }


  // STORAGES user

  getStorages(userId: string): Observable<any> {
    const params = new HttpParams().set('user', userId);

    return this.http.get(`${this.apiUrl}/storages`, { params }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          console.error('Accès non autorisé.');
          return throwError('Accès non autorisé.');
        }
        return throwError(err);
      })
    );
  }


  deleteStorages(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/storages/${id}`);
  }

  createStorage(name: string, userId: string): Observable<any> {
    const storage: StorageCreationRequest = {
      name: name,
      user: `/api/users/${userId}`,
    };
    return this.http.post(`${this.apiUrl}/storages`, storage);
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

    return this.http.get(`${this.apiUrl}/my_lists`, { params }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          console.error('Accès non autorisé.');
          return throwError('Accès non autorisé.');
        }
        return throwError(err);
      })
    );
  }

  createList(name: string, userId: string): Observable<any> {
    const list = {
      name: name,
      user: `/api/users/${userId}`,
    };
    return this.http.post(`${this.apiUrl}/my_lists`, list);
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
