import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebApiService } from 'src/app/service/web-api.service';
import { AuthService } from '../login/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.page.html',
  styleUrls: ['./list-detail.page.scss'],
})
export class ListDetailPage implements OnInit {

  productsOfMyList: any;

  constructor(
    private webApiService: WebApiService, 
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      console.log('Product ID:', id);
      if (id !== null) {
          this.getProductsOfMyList();
      }
    });

  }

  getProductsOfMyList() {
    this.webApiService.getProductsOfMyList().subscribe((data) => {
      this.productsOfMyList = data['hydra:member'];
      console.log(this.productsOfMyList);
    }
    );
  }
}
