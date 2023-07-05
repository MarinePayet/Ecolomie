// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { KeyValue } from '@angular/common';

// @Component({
//   selector: 'app-tab2',
//   templateUrl: 'tab2.page.html',
//   styleUrls: ['tab2.page.scss']
// })
// export class Tab2Page {


//   constructor( private http: HttpClient){

//   }

//     private configUrl = 'https://world.openfoodfacts.org/api/v2/product/3017620422003';
//     products: any;
//     currentProduct = undefined
//   ​

//     getProduct(){
//       this.http.get<any>(`${this.configUrl}`).subscribe(data => {
//         this.products = data['product'];
//         this.currentProduct = this.products;
//         console.log(this.products);
//       });
//     };
//     ​
//     ngOnInit(){
//       this.getProduct();
//       };

// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private configUrl = 'https://world.openfoodfacts.org/api/v2/product/3017620422003';
  products: any;
  currentProduct: any;

  constructor(private http: HttpClient) {}

  getProduct() {
    this.http.get<any>(this.configUrl).subscribe(data => {
      this.products = data['product'];
      this.currentProduct = this.products.brands;
      console.log(this.currentProduct);
    });
  }

  ngOnInit() {
    this.getProduct();
  }
}
