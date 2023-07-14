import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { ActionSheetController } from '@ionic/angular';
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
    public actionSheetController: ActionSheetController
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

  deleteStorage(id: number | null) {
    if (id === null) {
      console.error('No storage selected');
      return;
    }
    this.webApiService.deleteStorage(id).subscribe(() => {
      console.log('Stockage supprimé avec succès.');
      this.getStorages();
    }, error => {
      console.log('Erreur lors de la suppression du stockage :', error);
    });
  }

  updateStorage(id: number, newName: string) {
    const storageToUpdate = this.storages.find((storage: { id: number; name: string }) => storage.id === id);
    if (storageToUpdate) {
      const updatedStorage = Object.assign({}, storageToUpdate);
      updatedStorage.name = newName;
      this.webApiService.updateStorage(id, newName).subscribe(() => {
        console.log('Stockage mis à jour avec succès.');
        this.getStorages();
        this.isEditing = false; // Désactiver le mode édition
        this.selectedStorageId = null; // Réinitialiser le stockage sélectionné
      }, error => {
        console.log('Erreur lors de la mise à jour du stockage :', error);
      });
    }
  }

  enableEdit(id: number | null) {
    if (id === null) {
      console.error('No storage selected');
      return;
    }
    this.isEditing = true;
    this.selectedStorageId = id;
  }

  async actionSheetButtons(id: number) {
    this.selectedStorageId = id;
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteStorage(this.selectedStorageId);
          },
        },
        {
          text: 'Edit',
          handler: () => {
            this.enableEdit(this.selectedStorageId);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }

  createNewStorage(nom: string) {
    this.webApiService.createStorage(nom).subscribe(() => {
        console.log('Stockage créé avec succès.');
        this.getStorages();
    }, erreur => {
        console.log('Erreur lors de la création du stockage :', erreur);
    });
}

}
