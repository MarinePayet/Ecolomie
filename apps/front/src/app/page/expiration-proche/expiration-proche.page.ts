import { Component, OnInit } from '@angular/core';
import { WebApiService } from 'src/app/service/web-api.service';

@Component({
  selector: 'app-expiration-proche',
  templateUrl: './expiration-proche.page.html',
  styleUrls: ['./expiration-proche.page.scss'],
})
export class ExpirationProchePage implements OnInit {
  productUserStorages: any;

  constructor(
    private webApiService: WebApiService,
  ) { }

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

  calculateDaysDifference(dateStr: string): number {
    const today = new Date(); // Date du jour
    const givenDate = new Date(dateStr); // Date donnée, convertie depuis une chaîne (format 'yyyy-MM-dd')

    // Calcul du nombre de millisecondes entre les deux dates
    const timeDifference = givenDate.getTime() - today.getTime();

    // Conversion du nombre de millisecondes en jours
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    // if (daysDifference < 0){
    //   return Math.floor(Math.abs(daysDifference))
    // } else {

      return Math.floor(daysDifference); // Arrondir le nombre de jours à l'entier inférieur
    // }

    // return Math.floor(Math.abs(daysDifference));
  }



}
