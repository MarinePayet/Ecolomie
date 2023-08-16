import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebApiService } from 'src/app/service/web-api.service';
import { AuthService } from '../login/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-storage-detail',
  templateUrl: './storage-detail.page.html',
  styleUrls: ['./storage-detail.page.scss'],
})
export class StorageDetailPage implements OnInit {

  // productsOfMyList: any;
  productsUserStorage: any;
  idStorage?: number;
  // myListProducts: any;
  storages: any;


  constructor(
    private webApiService: WebApiService,
      private router: Router,
      public authService: AuthService, 
      private route: ActivatedRoute,
      private AlertController: AlertController,
      private toastController: ToastController,
  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idStorage = Number(params.get('id'));
      if (this.idStorage !== null) {
          this.getStorages();
        }
        console.log(this.getStorages());
    });
    this.getProductUserStorage()  
  }

  getStorages() {
    this.webApiService.getStorages().subscribe((data) => {
      this.storages = data['hydra:member'];
      console.log(this.storages);
    });
  }
  
  getProductUserStorage(){
    this.webApiService.getProductUserStorages().subscribe((data) => {
      this.productsUserStorage = data['hydra:member'];
      console.log(this.productsUserStorage);
    })
  }

}
