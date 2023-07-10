import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  storages: any;

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

  ;
  updateStorage(id: any, data: any) {
    this.webApiService.editStorage(id, data).subscribe((data) => {
      console.log(data);
      this.getStorages();
    });
  }
}
