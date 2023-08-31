
import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  productUserStorages: any;
  order: string = 'ASC';
  searchQuery: string = '';

  constructor(
    private webApiService: WebApiService, private router: Router,
    public authService: AuthService, private toastController: ToastController,
    private AlertController: AlertController
    ) {}

  ngOnInit() {
    this.loadProductUserStorages();
    this.getProductUserStorage();
  }

  loadProductUserStorages() {
    this.webApiService.getProductUserStoragesSorted(this.order, this.searchQuery).subscribe((data: any) => {
      this.productUserStorages = data['hydra:member'];
    });
  }

  changeOrder() {
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    this.loadProductUserStorages();
  }

  getProductUserStorages() {
    this.webApiService.getProductUserStorages().subscribe((data) => {
      this.productUserStorages = data['hydra:member'];
    }
    );
  }

  getProductUserStorage() {
    const userId = this.authService.getUserId();
    this.webApiService.getProductUserStorage(userId).subscribe((data: any) => {
      this.productUserStorages = data['hydra:member'];
    });
  }

  get isLoggedIn() {
    return this.authService.loggedIn$;
  }

  async onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    await this.presentToast('Logout successful');
    this.router.navigate(['/login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  openUpdatePage(id: number) {
    this.router.navigateByUrl('/update-product/' + id);
}
  async openDeleteConfirm(productId: string) {
    const alert = await this.AlertController.create({
      header: 'Confirmation',
      message: 'Êtes-vous sûr de vouloir supprimer ce produit ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        }, {
          text: 'Supprimer',
          handler: () => {
            this.webApiService.deleteProductUserStorage(Number(productId)).subscribe(() => {
              this.getProductUserStorages();
              this.presentToast('Le produit a été supprimé avec succès.');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  onSearchBar(event: any) {
    this.searchQuery = event.target.value;
    this.loadProductUserStorages();
  }

  calculateDaysDifference(dateStr: string): number {
    const today = new Date();
    const givenDate = new Date(dateStr);
    const timeDifference = givenDate.getTime() - today.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.floor(daysDifference);
  }

}
