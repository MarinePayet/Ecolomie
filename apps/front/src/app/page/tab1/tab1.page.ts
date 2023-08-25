import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { ApiService } from '../newproduct/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  storages: any;
  isEditing: boolean = false;
  selectedStorageId: number | null = null;
  productUserStorages: any;

  constructor(
    private webApiService: WebApiService,
    private apiService: ApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      console.log('Utilisateur non connecté, redirection vers la connexion.');
      this.router.navigate(['/login']);
      return;
    }
    this.getStorages();
  }

  getStorages() {
    const userId = this.authService.getCurrentUserId();
    if (userId === null) {
      console.error('Utilisateur non trouvé.');
      return;
    }

    this.webApiService.getStorages(userId).subscribe((response) => {
      this.storages = response['hydra:member'];
    }, error => {
      console.error('Erreur lors de la récupération des storages:', error);
    });
}

  async deleteStorage(storage: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Êtes-vous sûr de vouloir supprimer l'emplacement "${storage.name}" ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.webApiService.deleteStorage(storage.id).subscribe(() => {
              console.log('Emplacement supprimé avec succès.');
              this.getStorages();
              this.presentToast('Emplacement supprimé avec succès.');
            }, error => {
              console.log("Erreur lors de la suppression de l'emplacement", error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000 // 2 secondes
    });
    toast.present();

  }

  createNewStorage(name: string) {
    const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur connecté

    if (!userId) {
      console.error('Utilisateur non trouvé.');
      return;
    }

    console.log('ID de l\'utilisateur connecté:', userId);

    this.webApiService.createStorage(name, userId).subscribe(() => {
      console.log('Stockage créé avec succès.');
      this.getStorages();
    }, erreur => {
      console.log('Erreur lors de la création du stockage :', erreur);
    });
  }

  async createNewStoragePrompt() {
    const alert = await this.alertController.create({
      header: 'Nouveau Stockage',
      inputs: [
        {
          name: 'nom',
          type: 'text',
          placeholder: 'Nom du stockage'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Créer',
          handler: (data) => {
            const nom = data.nom;
            if (nom) {
              this.createNewStorage(nom);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  async onLogout() {
    this.authService.logout();
    console.log('Logout successful');
    this.presentToast('Logout successful');
    this.router.navigate(['/login']);
  }

  async scheduleNotificationForProduct(product: any) {
    const expirationDate = new Date(product.DLC);
    const currentTime = new Date();
    const timeDifference = expirationDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      console.log('Le produit est déjà expiré');
      return;
    }

    const options: ScheduleOptions = {
      notifications: [
        {
          id: product.barcode, // Utilisez un ID unique pour chaque produit
          title: "Expiration del producto ",
          body: (product.name, 'Le produit est sur le point d expirer !'),
          schedule: { at: new Date(currentTime.getTime() + timeDifference) }
        }
      ],
    };

    try {
      await LocalNotifications.schedule(options);
      console.log("Notification planifiée pour l'expiration du produit");
    } catch (ex) {
      console.error('Erreur lors de la planification de la notification :', ex);
    }
  }
  getProductUserStorages() {
    this.webApiService.getProductUserStorages().subscribe((data) => {
      this.productUserStorages = data['hydra:member'];
    }
    );
  }


  createNewProduct(product: any) {
    this.apiService.saveProduct(product).subscribe(() => {
      console.log('Produit créé avec succès.');
      this.scheduleNotificationForProduct(product); // Planifier la notification
    }, erreur => {
      console.log('Erreur lors de la création du produit :', erreur);
    });
  }



}
