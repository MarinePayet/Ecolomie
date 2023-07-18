import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  openActionSheet(arg0: any) {
    throw new Error('Method not implemented.');
  }

  storages: any;
  isEditing: boolean = false;
  selectedStorageId: number | null = null;


  constructor(
    private webApiService: WebApiService,
    private alertController: AlertController

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

 getProducts_user_storage(id:number) {
    this.webApiService.getproduct_user_storage(id).subscribe((data) => {
      this.storages = data['hydra:member'];
      console.log(this.storages);
    });
  }


  async deleteStorage(storage: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: `Êtes-vous sûr de vouloir supprimer le stockage "${storage.name}" ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.webApiService.deleteStorage(storage.id).subscribe(() => {
              console.log('Stockage supprimé avec succès.');
              this.getStorages();
            }, error => {
              console.log('Erreur lors de la suppression du stockage :', error);
            });
          }
        }
      ]
    });

    await alert.present();
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

}
