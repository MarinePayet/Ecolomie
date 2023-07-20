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
  product: any;
  showProductDetails = false;

  constructor(private http: HttpClient) {}

  getProduct(barcode: string) {
    this.http.get<any>(`${this.baseUrl}${barcode}`).subscribe(data => {
      this.product = {
        marques: data.product.brands,
        product_name: data.product.product_name,
        product_name_fr: data.product.product_name_fr,
        quantity: data.product.quantity,
        ingredients_text: data.product.ingredients_text,
        categories: data.product.main_category_fr,
        countries: data.product.countries_fr,
        nutriscore_grade: data.product.nutrition_grade_fr,
        image_front_url: data.product.image_front_url,
      };
      console.log(this.product);
    });

  }

  async scanBarcode() {
    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        this.getProduct(result.content);
      }
      this.showProductDetails = true;

    } catch (error) {
      console.error('Error scanning barcode:', error);
    }
  }

  clearProduct() {
    this.product = null;
    this.showProductDetails = false;
  }

  ngOnInit() {

  }
}
