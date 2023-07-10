import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  private configUrl = 'https://127.0.0.1:8000/api';

  storages: { name: string, description: string }[] = [];
  searchTerm: string = '';
  filteredStorages: { name: string, description: string }[];

  constructor(private http: HttpClient) {
    this.filteredStorages = [];
  }

  ngOnInit() {
    this.getStorage();
  }

  getStorage() {
    this.http.get<any>(`${this.configUrl}/storages`).subscribe(data => {
      this.storages = data['hydra:member'];
      this.filterStorages();
    });
  }

  filterStorages() {
    if (!this.searchTerm) {
      this.filteredStorages = this.storages;
    } else {
      this.filteredStorages = this.storages.filter(storage => {
        return storage.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || storage.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }
}
