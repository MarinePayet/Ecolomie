import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenfoodapiService {
  private readonly apiUrl= 'https://world.openfoodfacts.org/api/v2/product/3017620422003'

  constructor(private http: HttpClient) { }
}
