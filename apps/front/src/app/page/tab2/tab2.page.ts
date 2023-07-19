import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private baseUrl = 'https://world.openfoodfacts.org/api/v2/product/';
  products: any;
  currentProduct: any;

  constructor(private http: HttpClient) {}

  getProduct(barcode: string) {
    this.http.get<any>(`${this.baseUrl}${barcode}`).subscribe(data => {
      this.products = data['product'];
      this.currentProduct = this.products.brands;
      console.log(this.currentProduct);
    });
  }

  async scanBarcode() {
    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.getProduct(result.content);
      }
    } catch (error) {
      console.error('Error scanning barcode:', error);
    }
  }

  ngOnInit() {
  
  }
}
