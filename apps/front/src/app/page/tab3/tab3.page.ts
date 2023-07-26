
import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../../service/web-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  productUserStorages: any;


  constructor(
    private webApiService: WebApiService, private router: Router
    ) {}

  ngOnInit() {
    this.getProductUserStorages();
  }


  getProductUserStorages() {
    this.webApiService.getProductUserStorages().subscribe((data) => {
      this.productUserStorages = data['hydra:member'];
      console.log(this.productUserStorages);
    }
    );
  }

  getProductUserStorage(id: number) {
    this.webApiService.getProductUserStorage(id).subscribe((data) => {
      this.productUserStorages = data['hydra:member'];
      console.log(this.productUserStorages);
    }
    );
  }
}


