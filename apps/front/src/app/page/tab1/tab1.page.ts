import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { ApiService } from '../newproduct/api.service';
import { ChangeDetectorRef } from '@angular/core';



interface User {
  storages: Storage[];
  id: string;
}

interface Storage {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  isEditing: boolean = false;
  selectedStorageId: number | null = null;
  productUserStorages: any;
  userInfo: any;
  loggedIn: boolean;
  storages: Storage[] = [];
  userId: string;


  constructor(
    private webApiService: WebApiService,
    private apiService: ApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loggedIn = false;
    this.userId = '';
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
      if (!isLoggedIn) {
        console.log('Utilisateur non connecté, redirection vers la connexion.');
        this.router.navigate(['/login']);
      } else {
        // Utilisateur connecté
        this.getStorages();

        // Obtenez également les informations de l'utilisateur, y compris son userId
        this.authService.getUserInfo().subscribe(
          (userInfo) => {
            this.userId = userInfo.id; // Assurez-vous que 'id' est le bon champ
          },
          (error) => {
            console.log('Erreur lors de la récupération des informations de l\'utilisateur:', error);
          }
        );
  }

    });
  }


  getStorages() {
    this.webApiService.getStorages().subscribe(response => {
      console.log("Storages récupérés: ", response);
      if (response['hydra:member'] && Array.isArray(response['hydra:member'])) {
        this.storages = response['hydra:member'];
      }
      this.cdr.detectChanges();
    }, error => {
      console.error("Erreur lors de la récupération des storages:", error);
    });
  }

  refreshStorages() {
    this.getStorages();
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
            this.webApiService.deleteStorages(storage.id).subscribe(() => {
              console.log('Emplacement supprimé avec succès.');
              this.refreshStorages();  // Rafraîchit la liste des storages, gardez ce seul appel
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
    if (this.userId) {  // Assurez-vous que userId est défini avant de l'utiliser
      this.webApiService.createStorage(name, this.userId).subscribe(
        () => {
          console.log('Storage créé avec succès.');
          this.getStorages();  // Actualisez la liste des storages
        },
        (error) => {
          console.log('Erreur lors de la création du storage:', error);
        }
      );
    } else {
      console.log('UserId non défini.');
    }
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

  get isLoggedIn() {
    return this.authService.loggedIn$;
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
    this.webApiService.getProductUserStorages().subscribe(
      data => this.productUserStorages = data['hydra:member'],
      error => console.error('Erreur lors de la récupération des storages:', error)
    );
  }

  createNewProduct(product: any) {
    this.apiService.saveProduct(product).subscribe(() => {
      console.log('Produit créé avec succès.');
      this.scheduleNotificationForProduct(product); // Planifier la notification
      this.getProductUserStorages();
    }, error => {
      console.log('Erreur lors de la création du produit :', error);
    });
  }
}

