import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  storages: any;
  isEditing: boolean = false;
  selectedStorageId: number | null = null;

  constructor(private webApiService: WebApiService) {}

  ngOnInit() {
    this.getStorages();
  }

  getStorages() {
    this.webApiService.getStorages().subscribe((data) => {
      this.storages = data['hydra:member'];
      console.log(this.storages);
    });
  }

  deleteStorage(id: number) {
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


  enableEdit(id: number) {
    this.isEditing = true;
    this.selectedStorageId = id;
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedStorageId = null;
  }
  
}
