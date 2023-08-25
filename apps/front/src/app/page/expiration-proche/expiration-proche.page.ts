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
    this.getProductUserStoragesExpiringIn7Days();
    this.getProductUserStoragesExpired();
    this.getProductUserStoragesExpiringIn1Day();
    this.getProductUserStoragesExpiringIn15Days();
  }

  getProductUserStoragesExpiringIn7Days() {
    this.webApiService.getProductUserStoragesExpiringIn7Days().subscribe((data: any) => {
      this.productUserStoragesExpiringIn7Days = data['hydra:member'];
    });
  }

  getProductUserStoragesExpiringIn1Day() {
    this.webApiService.getProductUserStoragesExpiringIn1Day().subscribe((data: any) => {
      this.productUserStoragesExpiringIn1Day = data['hydra:member'];
    });
  }

  getProductUserStoragesExpiringIn15Days() {
    this.webApiService.getProductUserStoragesExpiringIn15Days().subscribe((data: any) => {
      this.productUserStoragesExpiringIn15Days = data['hydra:member'];
    });
  }

  getProductUserStoragesExpired() {
    this.webApiService.getProductUserStoragesExpired().subscribe((data: any) => {
      this.productUserStoragesExpired = data['hydra:member'];
    });
  }

  calculateDaysDifference(dateStr: string): number {
    const today = new Date();
    const givenDate = new Date(dateStr);
    const timeDifference = givenDate.getTime() - today.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.floor(daysDifference);
  }
}
