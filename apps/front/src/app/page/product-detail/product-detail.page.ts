import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../service/web-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: any;

  constructor(private route:ActivatedRoute, private webApiService: WebApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id !== null) {
      this.webApiService.getProduct(id).subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
    }
    });
  }
}
