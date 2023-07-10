import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {


  private configUrl = 'https://127.0.0.1:8000/api';
  products: any;

​
  constructor(private http: HttpClient){
  }

  getProduct(){
    this.http.get<any>(`${this.configUrl}/products`).subscribe(data => {
      this.products = data['hydra:member'];
      console.log(this.products);
});
  };
  ​
  ngOnInit() {
    this.getProduct();
  }

}
