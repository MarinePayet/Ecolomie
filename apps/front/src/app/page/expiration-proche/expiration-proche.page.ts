import { Component, OnInit } from '@angular/core';
import { WebApiService } from 'src/app/service/web-api.service';

@Component({
  selector: 'app-expiration-proche',
  templateUrl: './expiration-proche.page.html',
  styleUrls: ['./expiration-proche.page.scss'],
})
export class ExpirationProchePage implements OnInit {
  productUserStorages: any;
  productUserStoragesExpiringIn7Days: any;
  productUserStoragesExpiringIn1Day: any;
  productUserStoragesExpired: any;
  productUserStoragesExpiringIn15Days: any;


  constructor(
    private webApiService: WebApiService,
  ) { }

  ngOnInit() {
    // this.getProductUserStorages();
    this.getProductUserStoragesExpiringIn7Days();
    this.getProductUserStoragesExpired();
    this.getProductUserStoragesExpiringIn1Day();
    this.getProductUserStoragesExpiringIn15Days();
  }


  // getProductUserStorages() {
  //   this.webApiService.getProductUserStorages().subscribe((data) => {
  //     this.productUserStorages = data['hydra:member'];
  //     console.log(this.productUserStorages);
  //   }
  //   );
  // }
  getProductUserStoragesExpiringIn7Days() {
    this.webApiService.getProductUserStoragesExpiringIn7Days().subscribe((data: any) => {
      this.productUserStoragesExpiringIn7Days = data['hydra:member'];
      console.log('Produits expirant dans 7 jours :', this.productUserStoragesExpiringIn7Days);
    });
  }

  getProductUserStoragesExpiringIn1Day() {
    this.webApiService.getProductUserStoragesExpiringIn1Day().subscribe((data: any) => {
      this.productUserStoragesExpiringIn1Day = data['hydra:member'];
      console.log('Produits expirant dans 1 jours :', this.productUserStoragesExpiringIn1Day);
    });
  }

  getProductUserStoragesExpiringIn15Days() {
    this.webApiService.getProductUserStoragesExpiringIn15Days().subscribe((data: any) => {
      this.productUserStoragesExpiringIn15Days = data['hydra:member'];
      console.log('Produits expirant dans 1 jours :', this.productUserStoragesExpiringIn15Days);
    });
  }


  getProductUserStoragesExpired() {
    this.webApiService.getProductUserStoragesExpired().subscribe((data: any) => {
      this.productUserStoragesExpired = data['hydra:member'];
      console.log('Produits périmés :', this.productUserStoragesExpired);
    });
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
