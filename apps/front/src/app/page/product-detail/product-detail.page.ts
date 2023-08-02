import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebApiService } from '../../service/web-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  productUserStorage: any;
  storageOptions: any;

  constructor(private route:ActivatedRoute, private webApiService: WebApiService,  private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        if (id !== null) {
            this.getProductUserStorage(Number(id)); // Conversion de la chaîne en nombre
        }
    });

    this.webApiService.getStorages().subscribe((data) => {
      this.storageOptions = data;
  }
    );
  }

  getProductUserStorage(id: number) {
    this.webApiService.getProductUserStorage(id).subscribe((data) => {
      this.productUserStorage = data;
      console.log(this.productUserStorage);
      this.getStorageOptions(); // Ajoutez cette ligne pour récupérer les options d'emplacement
      console.log(typeof(this.storageOptions));
      console.log('porut');
    });
  }
  
  getStorageOptions() {
    this.webApiService.getStorages().subscribe((data) => {
      this.storageOptions = data['hydra:member'];
    });
  }

  deleteProductUserStorage(id: number) {
    this.webApiService.deleteProductUserStorage(id).subscribe((data) => {
      this.productUserStorage = data;
      console.log(this.productUserStorage);
      this.router.navigate(['/tabs/tab3']);
    }
    );
  }
 
}

