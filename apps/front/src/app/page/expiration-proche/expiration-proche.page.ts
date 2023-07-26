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
    const today = new Date(); // Date actuelle
    const givenDate = new Date(dateStr); // Date donnée, convertie depuis une chaîne (format 'yyyy-MM-dd')

    // Calcul du nombre de millisecondes entre les deux dates
    const timeDifference = givenDate.getTime() - today.getTime();

    // Conversion du nombre de millisecondes en jours
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return Math.floor(daysDifference); // Arrondir le nombre de jours à l'entier inférieur
  }

  

  // isDlcExpiresInOneDay(dlc: Date): boolean {
  //   const oneDayInMillis = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans une journée
  //   const oneDayFromNow = new Date().getTime() + oneDayInMillis; // Date d'aujourd'hui + 1 jour

  //   return dlc.getTime() <= oneDayFromNow;
  // }

  // formatDateToDDMMYYYY(date: Date): string {
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();

  //   return `${day}/${month}/${year}`;
  // }

}
