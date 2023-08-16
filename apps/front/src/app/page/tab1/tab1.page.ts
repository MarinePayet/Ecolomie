import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  storages: any;
  isEditing: boolean = false;
  selectedStorageId: number | null = null;
 
  constructor(
    private webApiService: WebApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getStorages();
  }

  getStorages() {
    this.webApiService.getStorages().subscribe((data) => {
      this.storages = data['hydra:member'];
      console.log(this.storages);
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

  createNewStorage(nom: string) {
    this.webApiService.createStorage(nom).subscribe(() => {
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
}
