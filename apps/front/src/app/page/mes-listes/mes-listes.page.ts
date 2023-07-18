import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';

@Component({
  selector: 'app-mes-listes',
  templateUrl: './mes-listes.page.html',
  styleUrls: ['./mes-listes.page.scss'],
})
export class MesListesPage implements OnInit {
  my_lists: any;


  constructor(private webApiService: WebApiService) {}

  ngOnInit() {
    this.getMyLists();
  }

  getMyLists() {
    this.webApiService.getMyLists().subscribe((data) => {
      this.my_lists = data['hydra:member'];
      console.log(this.my_lists);
    });
  }

  deleteList(id: number) {
    this.webApiService.deleteList(id).subscribe((data) => {
      console.log(data);
      this.getMyLists();
    });
  }
}
