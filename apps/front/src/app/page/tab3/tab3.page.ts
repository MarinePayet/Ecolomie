import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  products: any;


  constructor(private webApiService: WebApiService) {}

  ngOnInit() {
    this.getProducts();
  }



getProducts() {
    this.webApiService.getProducts().subscribe((data) => {
      this.products = data['hydra:member'];
      console.log(this.products);
    }
    );
  }


}
