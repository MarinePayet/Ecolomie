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
  loggedIn: boolean;



  constructor(
    private webApiService: WebApiService,
      private router: Router,
      public authService: AuthService,
      private route: ActivatedRoute,
      private AlertController: AlertController,
      private toastController: ToastController,
  ) {
    this.loggedIn = false;

  }


  ngOnInit() {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      if (!isLoggedIn) {
        console.log('Utilisateur non connecté, redirection vers la connexion.');
        this.router.navigate(['/login']);
      } else {
    this.getProductUserStorage()
  }
});
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

  async onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    this.presentToast('Logout successful');
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000 // 2 secondes
    });
    toast.present();

  }

}
